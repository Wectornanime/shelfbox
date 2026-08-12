import CollectionRepository from "@/domain/repositories/collection.repository";

export default class DeleteCollectionCase {
  constructor(private readonly repository: CollectionRepository) {}

  async execute(id: string): Promise<void> {
    if (!id.trim()) throw new Error("The collection id is required.");

    const Collection = await this.repository.findById(id.trim());

    if (!Collection) throw new Error("Collection not found.");

    await this.repository.delete(id.trim());

    return;
  }
}
