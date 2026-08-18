import { Link, useParams } from "react-router-dom";
import { SearchField } from "@heroui/react";

import MiniatureCard from "../components/miniatureCard";

import PageHeader from "@/ui/components/pageHeader";
import { BackIcon, PlusCircleIcon } from "@/ui/icons";
import useMiniaturesByCollection from "@/ui/hooks/miniatures/useMiniaturesByCollection";

export default function ListMiniaturesByCollectionIdPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { miniatures, loading, error } =
    useMiniaturesByCollection(collectionId);

  return (
    <>
      <PageHeader
        left={
          <Link to="/">
            <BackIcon />
          </Link>
        }
        right={
          <Link to={`/collections/${collectionId}/miniatures/new`}>
            <PlusCircleIcon />
          </Link>
        }
        title="ShelfBox"
      />

      <SearchField name="search">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-70" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <section className="flex justify-center gap-3 flex-wrap">
        <section className="flex justify-center gap-3 flex-wrap">
          {loading ? (
            <p>Carregando miniaturas...</p>
          ) : error ? (
            <p>Erro ao carregar miniaturas.</p>
          ) : miniatures.length === 0 ? (
            <p>Nenhuma miniatura cadastrada.</p>
          ) : (
            miniatures.map((miniature) => (
              <MiniatureCard
                key={miniature.id}
                id={miniature.id}
                title={miniature.name}
              />
            ))
          )}
        </section>
      </section>
    </>
  );
}
