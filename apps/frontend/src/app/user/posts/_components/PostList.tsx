import { Post } from "@/lib/types/model.types.d";
import PostListItem from "./PostListItem";
import Pagination from "@/components/Pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2"></div>
        <div></div>
        <div>Fecha</div>
        <div>Publicado</div>
        <div>Likes</div>
        <div>Commentarios</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;
