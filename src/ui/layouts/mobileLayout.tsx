import MobileNavbar from "@/ui/components/mobileNavbar";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 p-5">
      {children}
      <MobileNavbar />
    </div>
  );
}
