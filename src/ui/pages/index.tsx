import { Link, SearchField } from "@heroui/react";

import CollectionCard from "../components/collections/collectionCard";

import { PlusCircleIcon } from "@/ui/icons";
import PageHeader from "@/ui/components/pageHeader";

export default function IndexPage() {
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
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </section>
    </>
  );
}
