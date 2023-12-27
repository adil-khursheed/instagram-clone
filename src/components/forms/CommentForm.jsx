import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { useAddCommentMutation } from "../../features/comments/commentApiSlice";
import { toast } from "react-toastify";

const CommentForm = ({ post, buttonHidden }) => {
  const { register, handleSubmit, reset } = useForm();

  const [addCommentApi] = useAddCommentMutation();

  const onCommentSubmit = async (data) => {
    const addComment = await addCommentApi({ postId: post._id, data });
    if (addComment) {
      toast.success(addComment.data.message);
      reset();
    } else {
      toast.error(addComment.error.message);
    }
  };
  return (
    <form
      className="w-full flex items-center justify-between"
      onSubmit={handleSubmit(onCommentSubmit)}>
      <Input
        className="mt-1 border-none py-1 focus:bg-transparent"
        placeholder="Add a comment..."
        {...register("content", {
          required: true,
        })}
      />
      <Button
        bgColor="bg-transparent"
        textColor="text-slate-700"
        type="submit"
        className={`${buttonHidden} font-bold`}>
        Post
      </Button>
    </form>
  );
};

export default CommentForm;
