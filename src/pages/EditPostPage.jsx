import { BiEdit } from "react-icons/bi";
import { Loader, PostForm } from "../components";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/posts/postApiSlice";

const EditPostPage = () => {
  const { postId } = useParams();

  const { data, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BiEdit className="w-7 h-7" />
        <h3 className="font-bold text-xl">Edit Post</h3>
      </div>
      <PostForm post={data?.data} />
    </div>
  );
};

export default EditPostPage;
