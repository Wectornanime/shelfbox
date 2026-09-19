import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "@/ui/components/pageHeader";
import ShelfBoxImage from "@/ui/components/shelfBoxImage";
import Fab from "@/ui/components/fab";
import { BackIcon, EditIcon } from "@/ui/icons";
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
        title={miniature?.name ?? "Miniatura"}
      />

      {loading ? (
        <p>Carregando miniatura...</p>
      ) : error ? (
        <p>{error}</p>
      ) : miniature ? (
        <section>
          <ShelfBoxImage
            alt={miniature.images[0].alt}
            path={miniature.images[0].path}
          />

          <h1>{miniature.name}</h1>

          <p>Marca: {miniature.brand}</p>
          <p>Escala: {miniature.scale}</p>
          <p>Quantidade: {miniature.quantity}</p>
          <p>Favorita: {miniature.favorite ? "Sim" : "Não"}</p>
        </section>
      ) : null}

      <Fab
        icon={<EditIcon />}
        label="Editar"
        onClick={() => navigate("edit")}
      />
    </>
  );
}
