import { EllipsisIcon } from "lucide-react";

import PageHeader from "@/ui/components/pageHeader";

export default function IndexPage() {
  return (
    <>
      <PageHeader left={<EllipsisIcon />} title="h1" />
      <h1>HomePage</h1>
    </>
  );
}
