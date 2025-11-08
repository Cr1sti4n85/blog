"use client";
import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "./ui/button";
import { PropsWithChildren } from "react";
import { VariantProps } from "class-variance-authority";

type Props = PropsWithChildren<VariantProps<typeof buttonVariants>>;

const SubmitButton = ({ children, ...props }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse">Enviando</span> : children}
    </Button>
  );
};

export default SubmitButton;
