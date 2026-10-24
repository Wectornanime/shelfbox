import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { NotFoundIcon } from "@/ui/icons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="w-[50%] max-w-150px">
        <NotFoundIcon size={"100%"} />
      </div>
      <h1 className="font-bold text-7xl italic">404</h1>
      <p>NotFound</p>
      <p>Não foi possível localizar a página</p>
      <Button onPress={() => navigate("/")}>Ir para a Home</Button>
    </main>
  );
}
