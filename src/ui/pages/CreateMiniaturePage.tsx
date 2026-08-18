import { Button, Input, TextField, Label } from "@heroui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import PageHeader from "@/ui/components/pageHeader";
import { BackIcon, CheckCircleIcon } from "@/ui/icons";
import useMiniatures from "@/ui/hooks/miniatures/useMiniatures";

export default function CreateMiniaturePage() {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const { createMiniature, loading } = useMiniatures();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [scale, setScale] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError(null);

      await createMiniature({
        collectionId: collectionId || "",
        name,
        brand,
        scale,
      });

      navigate(`/collections/${collectionId}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create item.",
      );
    }
  }

  return (
    <>
      <PageHeader
        left={
          <Link to={`/collections/${collectionId}`}>
            <BackIcon />
          </Link>
        }
        right={
          <Button
            isIconOnly
            aria-label="Criar miniatura"
            form="create-miniature-form"
            isDisabled={loading}
            type="submit"
            variant="ghost"
          >
            <CheckCircleIcon />
          </Button>
        }
        title="Nova Miniatura"
      />

      <main className="flex flex-col gap-2">
        <form
          className="flex flex-col gap-2"
          id="create-miniature-form"
          onSubmit={handleSubmit}
        >
          <TextField isRequired name="name" value={name} onChange={setName}>
            <Label>Nome</Label>
            <Input placeholder="Ex.: Nissan Skyline GT-R" />
          </TextField>

          <TextField isRequired name="brand" value={brand} onChange={setBrand}>
            <Label>Marca</Label>
            <Input placeholder="Ex.: Hot Wheels" />
          </TextField>

          <TextField isRequired name="scale" value={scale} onChange={setScale}>
            <Label>Escala</Label>
            <Input placeholder="Ex.: 1:64" />
          </TextField>

          {error && <p role="alert">{error}</p>}
        </form>
      </main>
    </>
  );
}
