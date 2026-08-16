import { EllipsisIcon } from "lucide-react";

import PageHeader from "@/ui/components/pageHeader";
import MobileNavbar from "@/ui/components/mobileNavbar";

export default function IndexPage() {
  return (
    <>
      <PageHeader left={<EllipsisIcon />} title="HomePage" />

      <MobileNavbar />
    </>
  );
}
