export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-4 p-5 h-screen">
      {children}
      {/* <MobileNavbar /> */}
    </div>
  );
}
