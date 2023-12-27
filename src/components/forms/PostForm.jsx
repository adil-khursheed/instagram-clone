import { Button, Input, Loader } from "../index";
import { useForm, Controller } from "react-hook-form";
import { FileUploader } from "../index";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../features/posts/postApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      content: post?.content || "",
      images: post?.images[0].url || [],
      tags: post?.tags.join(",") || "",
    },
  });

  const [updatePostApi, { isLoading: updatePostLoading }] =
    useUpdatePostMutation();
  const [createPostApi, { isLoading: createPostLoading }] =
    useCreatePostMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const tags = data.tags?.replace(/ /g, "").split(",") || [];

    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("images", data.images[0]);
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    try {
      if (post) {
        const updatedPost = await updatePostApi(post?._id, formData).unwrap();

        if (updatedPost) {
          navigate(`/posts/${postId}`);
          toast.success("Post updated successfully!");
        }
      } else {
        const newPost = await createPostApi(formData).unwrap();

        if (newPost) {
          navigate(`/`);
          toast.success("Post created successfully!");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (updatePostLoading) {
    return <Loader />;
  }

  if (createPostLoading) {
    return <Loader />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="content">Caption</label>
        <textarea
          id="content"
          className="w-full h-36 border border-gray-200 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 custom-scrollbar"
          {...register("content", { required: true })}></textarea>
      </div>
      <div className="flex flex-col gap-2">
        <label>Add Photos</label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <FileUploader
              fieldChange={field.onChange}
              mediaUrl={post?.images[0].url}
            />
          )}
        />
      </div>
      <div>
        <Input
          label='Add Tags (separated by comma " , ")'
          placeholder="Art, Expression, Learn"
          type="text"
          className="h-12"
          {...register("tags", { required: true })}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">{post ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
};

export default PostForm;
