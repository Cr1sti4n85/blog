import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostsById } from "@/lib/actions/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const DeletePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostsById(+params.id);

  const formAction = async () => {
    "use server";
    await deletePost(+params.id);
    redirect("/user/posts");
  };

  return (
    <Card className="w-96 m-12 px-6 py-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-red-500 font-bold">Eliminar Post</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>
          Eliminarás de manera permanente tu publicación. Esta acción no se
          podrá revertir.
        </p>
        <hr className="m-3" />
        <p className="text-slate-400 font-bold">Título del post</p>
        <p>{post.title}</p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant={"secondary"} asChild>
            <Link href={"/user/posts"}>Cancelar</Link>
          </Button>
          <SubmitButton variant={"destructive"}>Eliminar</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeletePostPage;
