import { Button } from "@heroui/react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "@/ui/components/pageHeader";
import { BackIcon, CheckCircleIcon } from "@/ui/icons";
import useMiniature from "@/ui/hooks/miniatures/useMiniature";

export default function MiniatureDetailsPage() {
  const navigate = useNavigate();
  const { collectionId, miniatureId } = useParams<{
    collectionId: string;
    miniatureId: string;
  }>();
  const { miniature, loading, error } = useMiniature(miniatureId);

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
        title={miniature?.name ?? "Miniatura"}
      />

      {loading ? (
        <p>Carregando miniatura...</p>
      ) : error ? (
        <p>{error}</p>
      ) : miniature ? (
        <section>
          <h1>{miniature.name}</h1>

          <p>Marca: {miniature.brand}</p>
          <p>Escala: {miniature.scale}</p>
          <p>Quantidade: {miniature.quantity}</p>
          <p>Favorita: {miniature.favorite ? "Sim" : "Não"}</p>
        </section>
      ) : null}
    </>
  );
}
