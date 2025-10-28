import { fetchPostsById } from "@/lib/actions/postActions";
import Image from "next/image";
import NoImg from "../../../../../public/no-image.png";
import SanitizedContent from "../../_components/SanitizedContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostsById(Number(postId));
  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        Escrito por {post.author.name} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="relative w-80 h-60">
        <Image
          src={post.thumbnail || NoImg}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <SanitizedContent content={post.content} />

      {/*POSt COMMents here */}
    </main>
  );
};

export default PostPage;
