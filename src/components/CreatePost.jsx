import { PostForm } from "./index";

const CreatePost = () => {
  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <img
          src="/add-post.svg"
          alt="add post"
          style={{ width: "36px", height: "36px" }}
        />
        <h3 className="font-bold text-xl">Create Post</h3>
      </div>
      <PostForm />
    </div>
  );
};

export default CreatePost;
