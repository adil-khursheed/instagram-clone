import { Link } from "react-router-dom";
import { Loader } from "./index";
import { useGetMyPostsQuery } from "../features/posts/postApiSlice";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../app/constants/constants";
import { useGetMyProfileQuery } from "../features/profile/profileApiSlice";

const Profile = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading: profileLoading } = useGetMyProfileQuery();

  const {
    data: myPosts,
    error: postsError,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useGetMyPostsQuery({ page, limit: ITEMS_PER_PAGE });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom && !postsFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, postsFetching]);

  return (
    <div className="max-w-3xl my-4 sm:my-10 mx-auto px-4 flex flex-col gap-10">
      {profileLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-full flex gap-12 items-center justify-evenly">
            <div className="sm:w-40 sm:h-40 w-24 h-24 rounded-full">
              <img
                src={data?.data?.account.avatar.url}
                alt="profile-image"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
            <div className="max-w-xs w-full flex flex-col gap-3">
              <div className="flex items-center gap-8">
                <h3>{data?.data?.account.username}</h3>
                <Link
                  to={"/edit-profile"}
                  className="bg-gray-600 py-1 px-3 rounded-md text-white">
                  Edit Profile
                </Link>
              </div>
              <div className="flex items-center gap-8">
                <h5>{myPosts?.data?.totalPosts} Posts</h5>
                <h5>{data?.data?.followersCount} Followers</h5>
                <h5>{data?.data?.followingCount} Following</h5>
              </div>
              <h4>
                {data?.data?.firstName} {data?.data?.lastName}
              </h4>
              <h4>{data?.data?.bio}</h4>
            </div>
          </div>
        </div>
      )}

      <hr className="border-t-2 border-gray-300" />
      {postsError ? (
        <h3>Something went wrong with posts!</h3>
      ) : postsLoading ? (
        <Loader />
      ) : myPosts ? (
        <div className="w-full">
          {myPosts?.data?.posts.length <= 0 ? (
            <div className="w-full h-40 flex justify-center items-center">
              <h2 className="font-semibold text-gray-300 text-2xl">
                No Posts Yet
              </h2>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-1">
                {myPosts?.data?.posts.map((post) => (
                  <button
                    key={post._id}
                    className="max-w-[250px] max-h-[250px] w-full h-full">
                    <img
                      src={post.images[0].url}
                      alt={post.content}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              {postsFetching && <Loader />}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
