import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@heroui/react";

import PageHeader from "@/ui/components/pageHeader";
import ShelfBoxImage from "@/ui/components/shelfBoxImage";
import Fab from "@/ui/components/fab";
import { BackIcon, EditIcon, HeartFilledIcon } from "@/ui/icons";
import useMiniature from "@/ui/hooks/miniatures/useMiniature";

export default function MiniatureDetailsPage() {
  const navigate = useNavigate();

  const { collectionId, miniatureId } = useParams<{
    collectionId: string;
    miniatureId: string;
  }>();
  const { miniature, loading, error } = useMiniature(miniatureId);

  useEffect(() => {
    if (!error) return;

    toast.danger("Erro ao abrir a miniatura", {
      description: error,
    });
  }, [error]);

  return (
    <>
      <PageHeader
        left={
          <Link
            aria-label="Voltar para a coleção"
            to={`/collections/${collectionId}`}
          >
            <BackIcon />
          </Link>
        }
        title={miniature?.name ?? "Miniatura"}
      />

      <main className="mx-auto w-full max-w-4xl pb-28 pt-4 sm:pt-8">
        {loading ? (
          <p
            className="rounded-2xl bg-surface p-6 text-center text-muted"
            role="status"
          >
            Carregando miniatura...
          </p>
        ) : miniature ? (
          <section className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
            <div className="rounded-3xl bg-surface-secondary p-3 shadow-sm sm:p-5">
              <ShelfBoxImage
                alt={miniature.images[0]?.alt || miniature.name}
                className="aspect-square w-full rounded-2xl"
                path={miniature.images[0]?.path ?? ""}
              />
            </div>

            <div className="min-w-0 space-y-6 md:py-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Miniatura
                </p>
                <h1 className="break-words text-3xl font-bold tracking-tight sm:text-4xl">
                  {miniature.name}
                </h1>
                {miniature.description && (
                  <p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-muted">
                    {miniature.description}
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-foreground/10 bg-surface p-5 shadow-sm sm:p-6">
                <h2 className="mb-2 text-lg font-semibold">Detalhes</h2>
                <dl className="divide-y divide-foreground/10">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">Marca</dt>
                    <dd className="min-w-0 break-words text-right font-medium">
                      {miniature.brand || "Não informada"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">Escala</dt>
                    <dd className="min-w-0 break-words text-right font-medium">
                      {miniature.scale || "Não informada"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">Quantidade</dt>
                    <dd className="font-medium">{miniature.quantity}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3">
                    <dt className="text-sm text-muted">Favorita</dt>
                    <dd className="flex items-center gap-2 font-medium">
                      {miniature.favorite && (
                        <HeartFilledIcon className="text-danger" size={16} />
                      )}
                      {miniature.favorite ? "Sim" : "Não"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Fab
        icon={<EditIcon />}
        label="Editar"
        onClick={() => navigate("edit")}
      />
    </>
  );
}
