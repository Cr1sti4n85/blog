"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postActions";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const InterceptorDeletePostPage = (props: Props) => {
  //use allows to get a promise result in a client context
  const params = use(props.params);
  const postId = parseInt(params.id);
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar el post</AlertDialogTitle>
          <AlertDialogDescription>
            Eliminarás de manera permanente tu publicación. Esta acción no se
            podrá revertir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href={"/user/posts"}>Cancelar</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => deletePost(postId)} variant={"destructive"}>
              <a href="/user/posts">Eliminar</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;
