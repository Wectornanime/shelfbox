import { SearchField } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import Fab from "@components/fab";

import CollectionCard from "@/ui/components/collections/collectionCard";
import { PlusCircleIcon } from "@/ui/icons";
import PageHeader from "@/ui/components/pageHeader";
import useCollections from "@/ui/hooks/collections/useCollections";

export default function IndexPage() {
  const navigate = useNavigate();
  const { collections, loading, error } = useCollections();

  return (
    <>
      <PageHeader title="ShelfBox" />

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
            <CollectionCard
              key={item.id}
              icon={item.icon}
              id={item.id}
              title={item.name}
            />
          ))
        )}
      </section>

      <Fab
        icon={<PlusCircleIcon />}
        label="Adicionar"
        onClick={() => navigate("/collections/new")}
      />
    </>
  );
}
