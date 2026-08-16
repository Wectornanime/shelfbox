import { Link, SearchField } from "@heroui/react";

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
    </>
  );
}
