import { Link, Button, Input, TextField, Label, TextArea } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PageHeader from "@/ui/components/pageHeader";
import { BackIcon, CheckCircleIcon } from "@/ui/icons";
import useCollections from "@/ui/hooks/collections/useCollections";

export default function CreateCollectionPage() {
  const navigate = useNavigate();
  const { createCollection } = useCollections();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createCollection({
        name,
        description: description || undefined,
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
          <Link href="/">
            <BackIcon />
          </Link>
        }
        right={
          <Button
            isIconOnly
            aria-label="Criar coleção"
            form="create-collection-form"
            isDisabled={loading}
            type="submit"
            variant="ghost"
          >
            <CheckCircleIcon />
          </Button>
        }
        title="Nova Coleção"
      />

      <main className="flex flex-col gap-2">
        <form
          className="flex flex-col gap-2"
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
      </main>
    </>
  );
}
