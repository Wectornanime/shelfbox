import { Link, SearchField } from "@heroui/react";

import CollectionCard from "../components/collections/collectionCard";

import { PlusCircleIcon } from "@/ui/icons";
import PageHeader from "@/ui/components/pageHeader";
import useCollections from "@/ui/hooks/collections/useCollections";

export default function IndexPage() {
  const { collections, loading, error } = useCollections();

  return (
    <>
      <PageHeader
        right={
          <Link href="/collections/new">
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
        {loading ? (
          <p>Carregando coleções...</p>
        ) : error ? (
          <p>Erro ao carregar coleções.</p>
        ) : collections.length === 0 ? (
          <p>Nenhuma coleção cadastrada.</p>
        ) : (
          collections.map((item) => (
            <CollectionCard key={item.id} id={item.id} title={item.name} />
          ))
        )}
      </section>
    </>
  );
}
