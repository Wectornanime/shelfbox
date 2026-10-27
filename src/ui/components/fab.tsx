import type { ReactNode } from "react";

import {
  Button,
  Tooltip,
  TooltipContent,
  ButtonProps as HeroUiButtonProps,
} from "@heroui/react";

interface FabProps extends HeroUiButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

export default function Fab({
  icon,
  label,
  onClick,
  size = "lg",
  variant = "primary",
  disabled = false,
  className = "",
  ...rest
}: FabProps) {
  return (
    <Tooltip>
      <Button
        isIconOnly
        aria-label={label}
        className={`
          fixed
          right-6
          bottom-6
          z-50
          shadow-lg
          shadow-primary/30
          transition-transform
          hover:scale-105
          active:scale-95
          rounded-2xl
          ${className}
        `}
        isDisabled={disabled}
        size={size}
        variant={variant}
        onPress={onClick}
        {...rest}
      >
        {icon}
      </Button>

      <TooltipContent placement="left">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
