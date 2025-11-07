import { fetchPostsById } from "@/lib/actions/postActions";
import UpdatePostContainer from "./_components/UpdatePostContainer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const UpdatePostPage = async (props: Props) => {
  const { id } = await props.params;
  const post = await fetchPostsById(parseInt(id));
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Actualiza tu post
      </h2>
      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;
