import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@heroui/react";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, EditIcon } from "@/ui/icons";
import useCollection from "@/ui/hooks/collections/useCollection";
import ShelfBoxImage from "@/ui/components/shelfBoxImage";

export default function CollectionDetailsPage() {
  const navigate = useNavigate();
  const { collectionId } = useParams<{
    collectionId: string;
  }>();
  const { collection, loading, error } = useCollection(collectionId);

  useEffect(() => {
    if (!error) return;

    toast.danger("Erro ao abrir a coleção", {
      description: error,
    });
  }, [error]);

  return (
    <>
      <PageHeader
        left={
          <Link aria-label="Voltar para as miniaturas" to="./../">
            <BackIcon />
          </Link>
        }
        title={collection?.name ?? "Coleção"}
      />

      <main className="mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8">
        {loading ? (
          <p
            className="rounded-2xl bg-surface p-6 text-center text-muted"
            role="status"
          >
            Carregando coleção...
          </p>
        ) : collection ? (
          <section className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
            <div className="rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5">
              <ShelfBoxImage
                alt={collection.name}
                className="aspect-square w-full rounded-2xl"
                path={collection.icon ?? ""}
              />
            </div>

            <div className="min-w-0 space-y-6 md:py-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Coleção
                </p>
                <h1 className="break-words text-3xl font-bold tracking-tight sm:text-4xl">
                  {collection.name}
                </h1>
              </div>

              <div className="rounded-3xl border border-foreground/10 bg-surface p-5 shadow-sm sm:p-6">
                <h2 className="mb-3 text-lg font-semibold">Sobre a coleção</h2>
                <p className="whitespace-pre-wrap break-words leading-relaxed text-muted">
                  {collection.description || "Nenhuma descrição adicionada."}
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Fab
        icon={<EditIcon />}
        label="Editar"
        onClick={() => navigate("./../edit")}
      />
    </>
  );
}
