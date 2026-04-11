import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
}

export function Button(props: ButtonProps) {
  void props;
  return null;
}
