import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "@/ui/components/pageHeader";
import Fab from "@/ui/components/fab";
import { BackIcon, EditIcon } from "@/ui/icons";
import useCollection from "@/ui/hooks/collections/useCollection";

export default function CollectionDetailsPage() {
  const navigate = useNavigate();
  const { collectionId } = useParams<{
    collectionId: string;
  }>();
  const { collection, loading, error } = useCollection(collectionId);

  return (
    <>
      <PageHeader
        left={
          <Link to="./../">
            <BackIcon />
          </Link>
        }
        title={collection?.name ?? "Collection"}
      />

      {loading ? (
        <p>Carregando miniatura...</p>
      ) : error ? (
        <p>{error}</p>
      ) : collection ? (
        <section>
          <h1>{collection.name}</h1>

          <p>Marca: {collection.description}</p>
        </section>
      ) : null}

      <Fab
        icon={<EditIcon />}
        label="Editar"
        onClick={() => navigate("./../edit")}
      />
    </>
  );
}
