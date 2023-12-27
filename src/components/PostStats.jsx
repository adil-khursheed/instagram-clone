import { GoHeart, GoHeartFill } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import {
  useBookmarkUnbookmarkPostMutation,
  useLikeUnlikePostMutation,
} from "../features/posts/postApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PostStats = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [likeNumber, setLikeNumber] = useState(post?.likes);

  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked);

  const [likeUnlikePostApi] = useLikeUnlikePostMutation();

  const [bookmarkUnbookmarkPostApi] = useBookmarkUnbookmarkPostMutation();

  const likeUnlikeHandler = async () => {
    await likeUnlikePostApi(post._id);

    setIsLiked(!isLiked);

    if (isLiked) {
      setLikeNumber((prev) => prev - 1);
    } else {
      setLikeNumber((prev) => prev + 1);
    }
  };

  const bookmarkUnbookmarkHandler = async () => {
    await bookmarkUnbookmarkPostApi(post._id);

    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      toast.success("Your item has been saved.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 text-2xl">
          <div className="cursor-pointer" onClick={likeUnlikeHandler}>
            {isLiked ? <GoHeartFill className="text-[#FF3040]" /> : <GoHeart />}
          </div>
          <Link to={`/posts/${post._id}`}>
            <BsChat className="text-[22px] cursor-pointer" />
          </Link>
        </div>
        <div
          className="text-2xl cursor-pointer"
          onClick={bookmarkUnbookmarkHandler}>
          {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
        </div>
      </div>

      {likeNumber > 0 && (
        <div>
          <h4 className="text-base font-medium">
            {likeNumber} {likeNumber === 1 ? "like" : "likes"}
          </h4>
        </div>
      )}
    </>
  );
};

export default PostStats;
