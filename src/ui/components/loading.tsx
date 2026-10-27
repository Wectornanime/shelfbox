import { Spinner } from "@heroui/react";
import { HTMLAttributes } from "react";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Loading({ size = "lg", className }: LoadingProps) {
  return <Spinner className={className} size={size} />;
}
