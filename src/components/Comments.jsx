import { GoHeart, GoHeartFill } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { multiFormatDateString } from "../lib/utils";
import {
  useDeleteCommentMutation,
  useLikeUnlikeCommentMutation,
} from "../features/comments/commentApiSlice";
import { toast } from "react-toastify";

const Comments = ({ comment, user, data }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.isLiked);
  const [commentLikeNumber, setCommentLikeNumber] = useState(comment.likes);

  const [likeUnlikeCommentApi] = useLikeUnlikeCommentMutation();
  const [deleteCommentApi] = useDeleteCommentMutation();

  const commentLikeUnlikeHandler = async () => {
    await likeUnlikeCommentApi(comment._id);

    setIsCommentLiked(!isCommentLiked);

    if (isCommentLiked) {
      setCommentLikeNumber((prev) => prev - 1);
    } else {
      setCommentLikeNumber((prev) => prev + 1);
    }
  };

  const deleteCommentHandler = async () => {
    const deleteComment = await deleteCommentApi(comment._id);

    if (deleteComment) {
      toast.success("Comment deleted successfully!");
    }
  };

  return (
    <div className="flex items-start gap-3 p-3">
      <div className="w-8 h-8 rounded-full">
        <img
          src={comment.author.account.avatar.url}
          alt=""
          className="w-full h-full object-cover object-top rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2 text-sm">
            <h3 className="font-semibold">{comment.author.account.username}</h3>
            <p>{comment.content}</p>
          </div>
          <div className="mt-[6px] flex items-center gap-2 text-sm">
            <button
              className="cursor-pointer"
              onClick={commentLikeUnlikeHandler}>
              {isCommentLiked ? (
                <GoHeartFill className="text-[#FF3040]" />
              ) : (
                <GoHeart />
              )}
            </button>

            {(user._id === data?.data.author.account._id ||
              user._id === comment.author.account._id) && (
              <button className="cursor-pointer" onClick={deleteCommentHandler}>
                <BsTrash />
              </button>
            )}
          </div>
        </div>

        <div className="text-xs  text-gray-400 flex items-center gap-3">
          <p>{multiFormatDateString(comment.createdAt)}</p>
          {commentLikeNumber > 0 && (
            <p>
              {commentLikeNumber} {commentLikeNumber === 1 ? "like" : "likes"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
