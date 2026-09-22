import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, TextArea, TextField } from "@heroui/react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, SaveIcon, TrashIcon } from "@/ui/icons";
import useMiniature from "@/ui/hooks/miniatures/useMiniature";
import useDeleteMiniature from "@/ui/hooks/miniatures/useDeleteMiniature";
import useUpdateMiniature from "@/ui/hooks/miniatures/useUpdateMiniature";
import { imageService } from "@/app/composition/imageService";

export default function MiniatureEditPage() {
  const navigate = useNavigate();

  const { collectionId, miniatureId } = useParams<{
    collectionId: string;
    miniatureId: string;
  }>();

  const {
    miniature,
    loading: miniatureLoading,
    error: miniatureError,
  } = useMiniature(miniatureId);

  const {
    updateMiniature,
    loading: updateLoading,
    error: updateError,
  } = useUpdateMiniature();

  const {
    deleteMiniature,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteMiniature();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [scale, setScale] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<Error | null>(null);

  const loading = miniatureLoading || updateLoading || deleteLoading;

  const errorMessage = error ?? miniatureError ?? updateError ?? deleteError;

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  useEffect(() => {
    if (!miniature) return;

    setName(miniature.name);
    setDescription(miniature.description ?? "");
    setBrand(miniature.brand);
    setScale(miniature.scale);

    let objectUrl: string | null = null;

    async function loadImage() {
      const path = miniature!.images[0]?.path;

      if (!path) {
        setImagePreview(null);

        return;
      }

      const url = await imageService.get(path);

      if (url) {
        objectUrl = url;
        setImagePreview(url);
      }
    }

    loadImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [miniature]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!miniature) return;

    if (!miniatureId) {
      setError(new Error("Miniature id is required."));

      return;
    }

    try {
      setError(null);

      let newImage;

      if (image) {
        newImage = await imageService.save(image);

        if (miniature.images[0]) {
          await imageService.delete(miniature.images[0].path);
        }
      }

      await updateMiniature({
        id: miniatureId,
        data: {
          name,
          description: description || undefined,
          brand,
          scale,
          ...(newImage && {
            images: [
              {
                id: crypto.randomUUID(),
                path: newImage,
              },
            ],
          }),
        },
      });

      navigate(`/collections/${collectionId}/miniatures/${miniatureId}`);
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Failed to update miniature.");

      setError(normalizedError);
    }
  }

  async function handleDelete() {
    if (!miniatureId) {
      setError(new Error("Miniature id is required."));

      return;
    }

    try {
      setError(null);

      await deleteMiniature(miniatureId);

      navigate(`/collections/${collectionId}`);
    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Failed to delete miniature.");

      setError(normalizedError);
    }
  }

  return (
    <>
      <PageHeader
        left={
          <Link to={`/collections/${collectionId}/miniatures/${miniatureId}`}>
            <BackIcon />
          </Link>
        }
        right={
          <Button
            isIconOnly
            aria-label="Excluir miniatura"
            isDisabled={loading}
            type="button"
            variant="ghost"
            onPress={handleDelete}
          >
            <TrashIcon />
          </Button>
        }
        title={miniature?.name ?? "Miniatura"}
      />

      {miniatureLoading ? (
        <p>Carregando miniatura...</p>
      ) : errorMessage ? (
        <p>
          {typeof errorMessage === "string"
            ? errorMessage
            : errorMessage.message}
        </p>
      ) : miniature ? (
        <section className="flex flex-col items-center gap-2">
          <input
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            type="file"
            onChange={handleImageChange}
          />

          <Card
            className="relative col-span-12 h-50 w-50 cursor-pointer overflow-hidden rounded-3xl lg:col-span-6"
            onClick={handleImageClick}
          >
            <img
              alt={image?.name ?? "Preview da miniatura"}
              className="absolute inset-0 h-full w-full object-cover"
              src={imagePreview ?? "/no-image-found-360x250.png"}
            />
          </Card>

          <form
            className="flex w-full flex-col gap-4"
            id="edit-miniature-form"
            onSubmit={handleSubmit}
          >
            <TextField
              isRequired
              className="w-full"
              name="name"
              type="text"
              value={name}
              onChange={setName}
            >
              <Label>Nome</Label>
              <Input />
            </TextField>

            <TextField
              className="w-full"
              name="description"
              type="text"
              value={description}
              onChange={setDescription}
            >
              <Label>Descrição</Label>
              <TextArea />
            </TextField>

            <TextField
              className="w-full"
              name="brand"
              type="text"
              value={brand}
              onChange={setBrand}
            >
              <Label>Marca</Label>
              <Input />
            </TextField>

            <TextField
              className="w-full"
              name="scale"
              type="text"
              value={scale}
              onChange={setScale}
            >
              <Label>Escala</Label>
              <Input />
            </TextField>
          </form>
        </section>
      ) : null}

      <Fab
        form="edit-miniature-form"
        icon={<SaveIcon />}
        isDisabled={loading}
        label="Salvar edição"
        type="submit"
      />
    </>
  );
}
