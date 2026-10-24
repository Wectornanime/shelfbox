import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { NotFoundIcon } from "@/ui/icons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex h-full min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="w-28 sm:w-36 md:w-44 lg:w-56">
        <NotFoundIcon size={"100%"} />
      </div>
      <h1 className="text-5xl font-bold italic sm:text-6xl md:text-7xl lg:text-8xl">
        404
      </h1>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-medium sm:text-xl">Página não encontrada</p>
        <p className="text-sm text-default-500 sm:text-base">
          Não foi possível localizar a página
        </p>
      </div>
      <Button onPress={() => navigate("/")}>Ir para a Home</Button>
    </main>
  );
}
