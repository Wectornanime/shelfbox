import DexieImageStorageRepository from "./DexieImageStorage.repository";

import { dexieDatabase } from "@/infrastructure/database";

describe("DexieImageStorageRepository", () => {
  let sut: DexieImageStorageRepository;

  beforeEach(async () => {
    sut = new DexieImageStorageRepository();

    await dexieDatabase.images.clear();
  });

  afterAll(async () => {
    await dexieDatabase.delete();
  });

  describe("save", () => {
    it("should save an image", async () => {
      const file = new Blob(["image content"], {
        type: "image/png",
      });

      const path = "images/miniatures/miniature-1/image-1.png";

      await sut.save(file, path);

      const storedImage = await dexieDatabase.images.get(path);

      expect(storedImage).toBeDefined();
      expect(storedImage?.path).toBe(path);

      expect(storedImage?.blob).toBeInstanceOf(Blob);
      expect(storedImage?.blob.type).toBe("image/png");
      expect(await storedImage?.blob.text()).toBe("image content");
    });

    it("should replace an existing image with the same path", async () => {
      const firstFile = new Blob(["first image"], {
        type: "image/png",
      });

      const secondFile = new Blob(["second image"], {
        type: "image/png",
      });

      const path = "images/miniatures/miniature-1/image-1.png";

      await sut.save(firstFile, path);
      await sut.save(secondFile, path);

      const storedImage = await dexieDatabase.images.get(path);

      expect(storedImage?.blob).toBeInstanceOf(Blob);
      expect(await storedImage?.blob.text()).toBe("second image");
    });
  });

  describe("get", () => {
    it("should return an existing image", async () => {
      const file = new Blob(["image content"], {
        type: "image/png",
      });

      const path = "images/miniatures/miniature-1/image-1.png";

      await sut.save(file, path);

      const result = await sut.get(path);

      expect(result).toBeInstanceOf(Blob);
      expect(result?.type).toBe("image/png");
      expect(await result?.text()).toBe("image content");
    });

    it("should return null when the image does not exist", async () => {
      const path = "images/miniatures/miniature-1/image-1.png";

      const result = await sut.get(path);

      expect(result).toBeNull();
    });
  });

  describe("delete", () => {
    it("should delete an existing image", async () => {
      const file = new Blob(["image content"], {
        type: "image/png",
      });

      const path = "images/miniatures/miniature-1/image-1.png";

      await sut.save(file, path);

      await sut.delete(path);

      const result = await sut.get(path);

      expect(result).toBeNull();
    });

    it("should not throw when deleting a non-existing image", async () => {
      const path = "images/miniatures/miniature-1/image-1.png";

      await expect(sut.delete(path)).resolves.toBeUndefined();
    });
  });
});
