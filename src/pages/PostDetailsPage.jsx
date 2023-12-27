import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/posts/postApiSlice";
import { CommentForm, Comments, Loader, PostStats } from "../components/index";
import { BsThreeDots } from "react-icons/bs";
import { multiFormatDateString } from "../lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useGetPostCommentQuery } from "../features/comments/commentApiSlice";
import { useState } from "react";

const PostDetailsPage = () => {
  const [page, setPage] = useState(1);
  const { postId } = useParams();

  const user = useSelector(selectCurrentUser);
  console.log(user);

  const { data, isLoading, isError } = useGetPostByIdQuery(postId);
  console.log(data);

  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
  } = useGetPostCommentQuery({ postId, page });
  console.log(commentData);

  if (isError || commentError) {
    return <p>Something went wrong!!</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      {isLoading || commentLoading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl w-full h-[600px] mx-auto flex border">
          <div className=" w-full h-full flex justify-center items-center mx-auto overflow-hidden">
            {data?.data.images.map((postImage) => (
              <img src={postImage.url} alt="" key={postImage._id} />
            ))}
          </div>

          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center w-full py-2 border-b border-l px-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={data?.data.author.account.avatar.url}
                    alt=""
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="font-semibold flex flex-col">
                  <h3>{data?.data.author.account.username}</h3>
                  <p className="text-[12px] leading-[140%] lg:text-[14px] lg:font-normal text-gray-400">
                    {multiFormatDateString(data?.data.createdAt)}
                  </p>
                </div>
              </div>
              <div className="cursor-pointer">
                <BsThreeDots />
              </div>
            </div>

            <div className="flex-1 border-l border-b overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="flex items-start gap-3 p-3">
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={data?.data.author.account.avatar.url}
                    alt=""
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <h3 className="font-semibold">
                      {data?.data.author.account.username}
                    </h3>
                    <p>{data?.data.content}</p>
                  </div>
                  {data?.data.tags.length > 0 && (
                    <ul className="flex gap-2 whitespace-nowrap">
                      {data?.data.tags.map((tag, index) => (
                        <li
                          key={`${tag}${index}`}
                          className="text-blue-500 text-[14px] font-normal leading-[140%] cursor-pointer">
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    <p>{multiFormatDateString(data?.data.createdAt)}</p>
                  </div>
                </div>
              </div>
              {commentData && commentData?.data.comments.length > 0 ? (
                commentData?.data.comments.map((comment) => (
                  <Comments
                    key={comment._id}
                    comment={comment}
                    user={user}
                    data={data}
                  />
                ))
              ) : (
                <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                  <p className="text-xl font-bold text-gray-600">
                    No comments yet.
                  </p>
                  <p className="text-sm font-medium text-gray-400">
                    Start the conversation.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col border-l">
              <div className="px-3 py-2">
                <PostStats post={data?.data} />
              </div>

              <div className="flex items-center gap-3 w-full px-3">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={user?.avatar.url}
                    alt=""
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="p-3">
                  <CommentForm post={data?.data} buttonHidden={"hidden"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
