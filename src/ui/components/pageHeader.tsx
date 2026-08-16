import { Typography } from "@heroui/react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export default function PageHeader({
  title,
  right: RightComponent,
  left: LeftComponent,
}: PageHeaderProps) {
  return (
    <header className="grid grid-cols-[minmax(40px,max-content)_1fr_minmax(40px,max-content)] w-full items-center p-1">
      {LeftComponent ?? LeftComponent}

      <Typography className="col-start-2 text-center" type="h1">
        {title}
      </Typography>

      {RightComponent ?? RightComponent}
    </header>
  );
}
