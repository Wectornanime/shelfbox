import { Input, TextField, Label, Card, toast } from "@heroui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, CheckCircleIcon } from "@/ui/icons";
import useMiniatures from "@/ui/hooks/miniatures/useMiniatures";

export default function CreateMiniaturePage() {
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const { createMiniature, loading } = useMiniatures();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [scale, setScale] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

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
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (!error) return;

    toast.danger("Erro ao cadastrar miniatura", {
      description: error,
    });
  }, [error]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError(null);

      await createMiniature({
        collectionId: collectionId || "",
        name,
        brand,
        scale,
        image: image ? image : undefined,
      });

      toast.success("Miniatura cadastrada com sucesso");
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
        title="Nova miniatura"
      />

      <main className="mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8">
        <input
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleImageChange}
        />

        <section className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
          <div className="rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5">
            <Card
              className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl"
              onClick={handleImageClick}
            >
              <img
                alt={image?.name ?? "Preview da miniatura"}
                className="absolute inset-0 h-full w-full object-cover"
                src={imagePreview ?? "/no-image-found-360x250.png"}
              />
            </Card>
          </div>

          <div className="min-w-0 flex flex-col gap-4 md:py-4">
            <form
              className="flex w-full flex-col gap-4"
              id="create-miniature-form"
              onSubmit={handleSubmit}
            >
              <TextField isRequired name="name" value={name} onChange={setName}>
                <Label>Nome</Label>
                <Input placeholder="Ex.: Nissan Skyline GT-R" />
              </TextField>

              <TextField
                isRequired
                name="brand"
                value={brand}
                onChange={setBrand}
              >
                <Label>Marca</Label>
                <Input placeholder="Ex.: Hot Wheels" />
              </TextField>

              <TextField
                isRequired
                name="scale"
                value={scale}
                onChange={setScale}
              >
                <Label>Escala</Label>
                <Input placeholder="Ex.: 1:64" />
              </TextField>
            </form>
          </div>
        </section>
      </main>

      <Fab
        form="create-miniature-form"
        icon={<CheckCircleIcon />}
        isDisabled={loading}
        label="Criar miniatura"
        type="submit"
      />
    </>
  );
}
