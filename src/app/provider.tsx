import { ToastProvider } from "@heroui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider maxVisibleToasts={3} placement="top" />
      {children}
    </>
  );
}
