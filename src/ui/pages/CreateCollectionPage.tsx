import { Input, TextField, Label, TextArea, Card } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, CheckCircleIcon } from "@/ui/icons";
import useCollections from "@/ui/hooks/collections/useCollections";

export default function CreateCollectionPage() {
  const navigate = useNavigate();
  const { createCollection } = useCollections();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createCollection({
        name,
        description: description || undefined,
        image: image ? image : undefined,
      });

      // depois vamos navegar de volta para "/"
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create collection.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        left={
          <Link to="/">
            <BackIcon />
          </Link>
        }
        title="Nova Coleção"
      />

      <main className="flex flex-col items-center gap-2">
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
          className="w-full flex flex-col gap-2"
          id="create-collection-form"
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
            <Input placeholder="Coleção" />
          </TextField>

          <TextField
            className="w-full"
            name="description"
            type="text"
            value={description}
            onChange={setDescription}
          >
            <Label>Descrição</Label>
            <TextArea placeholder="Uma nova coleção ..." rows={4} />
          </TextField>

          {error && <p role="alert">{error}</p>}
        </form>

        <Fab
          form="create-collection-form"
          icon={<CheckCircleIcon />}
          isDisabled={loading}
          label="Criar coleção"
          type="submit"
        />
      </main>
    </>
  );
}
