import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Label, TextField, toast } from "@heroui/react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import UserDialogConfirm from "@/ui/components/userDialogConfirm";
import { BackIcon, SaveIcon, TrashIcon } from "@/ui/icons";
import useCollection from "@/ui/hooks/collections/useCollection";
import useDeleteCollection from "@/ui/hooks/collections/useDeleteCollection";
import useUpdateCollection from "@/ui/hooks/collections/useUpdateCollection";
import { imageService } from "@/app/composition/imageService";

export default function CollectionEditPage() {
  const navigate = useNavigate();

  const { collectionId } = useParams<{
    collectionId: string;
  }>();

  const {
    collection,
    loading: collectionLoading,
    error: collectionError,
  } = useCollection(collectionId);

  const {
    updateCollection,
    loading: updateLoading,
    error: updateError,
  } = useUpdateCollection();

  const {
    deleteCollection,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCollection();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const loading = collectionLoading || updateLoading || deleteLoading;
  const errorMessage = error ?? collectionError ?? updateError ?? deleteError;

  useEffect(() => {
    if (!errorMessage) return;

    toast.danger("Erro ao editar coleção", {
      description: errorMessage.toString(),
    });
  }, [errorMessage]);

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
    if (!collection) return;

    setName(collection.name);
    setDescription(collection.description ?? "");

    let objectUrl: string | null = null;

    async function loadIcon() {
      if (!collection!.icon) {
        setImagePreview(null);

        return;
      }

      const url = await imageService.get(collection!.icon);

      if (url) {
        objectUrl = url;
        setImagePreview(url);
      }
    }

    loadIcon();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [collection]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!collectionId) {
      setError("Collection id is required.");

      return;
    }

    if (!collection) {
      setError("Collection not loaded.");

      return;
    }

    try {
      setError(null);

      const oldIcon = collection.icon;
      let newIcon = oldIcon;

      if (image) {
        newIcon = await imageService.save(image);
      }

      await updateCollection({
        id: collectionId,
        data: {
          name,
          description: description || undefined,
          icon: newIcon,
        },
      });

      if (image && oldIcon) {
        await imageService.delete(oldIcon);
      }

      toast.success("Coleção editada com sucesso.");
      navigate(`/collections/${collectionId}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update collection.",
      );
    }
  }

  async function handleDelete() {
    if (!collectionId) {
      setError("Collection id is required.");

      return;
    }

    try {
      setError(null);

      await deleteCollection(collectionId);

      toast.success("Coleção removida com sucesso.");
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete collection.",
      );
    }
  }

  return (
    <>
      <PageHeader
        left={
          <Link to="./../info">
            <BackIcon />
          </Link>
        }
        right={
          <UserDialogConfirm
            actionConfirm={{
              label: "Remover coleção",
              onPress: handleDelete,
            }}
            body="Ao remover esta coleção ela não poderá mais retornar, junto com todos os itens que pertencem a ela."
            header="Remover coleção?"
          >
            <Button
              isIconOnly
              aria-label="Excluir coleção"
              isDisabled={loading}
              type="button"
              variant="ghost"
            >
              <TrashIcon />
            </Button>
          </UserDialogConfirm>
        }
        title="Editar coleção"
      />

      <main className="mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8">
        {collectionLoading ? (
          <p
            className="rounded-2xl bg-surface p-6 text-center text-muted"
            role="status"
          >
            Carregando coleção...
          </p>
        ) : errorMessage ? (
          <p
            className="rounded-2xl bg-surface p-6 text-center text-danger"
            role="alert"
          >
            {errorMessage.toString()}
          </p>
        ) : collection ? (
          <section className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
            <input
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleImageChange}
            />

            <div className="rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5">
              <Card
                className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl"
                onClick={handleImageClick}
              >
                <img
                  alt={image?.name ?? "Preview da coleção"}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={imagePreview ?? "/no-image-found-360x250.png"}
                />
              </Card>
            </div>

            <div className="min-w-0 flex flex-col gap-4 md:py-4">
              <form
                className="flex w-full flex-col gap-4"
                id="edit-collection-form"
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
                  <Input />
                </TextField>
              </form>
            </div>
          </section>
        ) : null}
      </main>

      <Fab
        form="edit-collection-form"
        icon={<SaveIcon />}
        isDisabled={loading}
        label="Salvar edição"
        type="submit"
      />
    </>
  );
}
