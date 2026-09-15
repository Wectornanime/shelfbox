import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, SaveIcon, TrashIcon } from "@/ui/icons";
import useCollection from "@/ui/hooks/collections/useCollection";
import useDeleteCollection from "@/ui/hooks/collections/useDeleteCollection";
import useUpdateCollection from "@/ui/hooks/collections/useUpdateCollection";

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
  const [icon, setIcon] = useState("");

  const [error, setError] = useState<string | null>(null);
  const loading = collectionLoading || updateLoading || deleteLoading;
  const errorMessage = error ?? collectionError ?? updateError ?? deleteError;

  useEffect(() => {
    if (!collection) return;

    setName(collection.name);
    setDescription(collection.description ?? "");
    setIcon(collection.icon ?? "");
  }, [collection]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!collectionId) {
      setError("Collection id is required.");

      return;
    }

    try {
      setError(null);

      await updateCollection({
        id: collectionId,
        data: {
          name,
          description: description || undefined,
          icon: icon || undefined,
        },
      });

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
          <Button
            isIconOnly
            aria-label="Excluir coleção"
            isDisabled={loading}
            type="button"
            variant="ghost"
            onPress={handleDelete}
          >
            <TrashIcon />
          </Button>
        }
        title={collection?.name ?? "Collection"}
      />

      {collectionLoading ? (
        <p>Carregando coleção...</p>
      ) : errorMessage ? (
        <p>{errorMessage.toString()}</p>
      ) : collection ? (
        <section>
          <form
            className="flex flex-col gap-4"
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
        </section>
      ) : null}

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
