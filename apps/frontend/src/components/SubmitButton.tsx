import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? (
        <span className="animate-pulse">Enviando</span>
      ) : (
        props.children
      )}
    </Button>
  );
};

export default SubmitButton;
