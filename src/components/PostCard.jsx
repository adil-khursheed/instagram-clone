import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { PostStats } from "./index";
import { multiFormatDateString } from "../lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const PostCard = ({ post }) => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="max-w-screen-sm w-full sm:p-5 lg:p-7 sm:border border-gray-200 rounded-3xl">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <Link to={`/${post?.author.account.username}`}>
            <img
              src={post?.author?.account?.avatar.url}
              alt="creator"
              className="w-10 h-10 object-cover object-top rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <Link to={`/${post?.author.account.username}`}>
              <p>{post?.author.account.username}</p>
            </Link>
            <div>
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal text-gray-400">
                {multiFormatDateString(post?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/edit-post/${post._id}`}
          className={`${user._id !== post?.author.owner && "hidden"}`}>
          <BiEdit />
        </Link>
      </div>

      <Link to={`/posts/${post._id}`}>
        {post?.images.map((postImage) => (
          <img
            src={postImage.url}
            alt=""
            key={postImage._id}
            className="w-full rounded-[16px] object-cover mb-5"
          />
        ))}
      </Link>

      <PostStats post={post} userId={post?.author.account._id} />

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Link
            to={`/${post?.author.account.username}`}
            className="font-semibold">
            <p>{post?.author.account.username}</p>
          </Link>
          <p>{post?.content}</p>
        </div>
        {post.tags.length > 0 ? (
          <ul className="flex gap-2 whitespace-nowrap">
            {post?.tags.map((tag, index) => (
              <li
                key={`${tag}${index}`}
                className="text-blue-500 text-[14px] font-normal leading-[140%] cursor-pointer">
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
