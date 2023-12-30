import { Link, useParams } from "react-router-dom";
import { Button, FollowStatsModal, Loader } from "./index";
import {
  useGetMyPostsQuery,
  useGetPostsByUsernameQuery,
} from "../features/posts/postApiSlice";
import { useEffect, useState } from "react";
import {
  useGetMyProfileQuery,
  useGetProfileByUsernameQuery,
} from "../features/profile/profileApiSlice";
import {
  useFollowUnfollowUserMutation,
  useGetFollowersListQuery,
  useGetFollowingToListQuery,
} from "../features/follow/followApiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [following, setFollowing] = useState(false);

  const { username } = useParams();

  const [followUnfollowUserApi] = useFollowUnfollowUserMutation();

  const { data, isLoading: profileLoading } = useGetMyProfileQuery();

  const { data: userProfileData, isLoading: userProfileLoading } =
    useGetProfileByUsernameQuery(username);

  const currentUserProfile = data?.data.owner === userProfileData?.data.owner;

  const {
    data: myPosts,
    error: postsError,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useGetMyPostsQuery(page);

  const {
    data: userPostsData,
    isLoading: userPostsLoading,
    error: userPostsError,
  } = useGetPostsByUsernameQuery({ username, page });

  const { data: followersData, isLoading: followersLoading } =
    useGetFollowersListQuery({ username, page });

  const { data: followingData, isLoading: followingLoading } =
    useGetFollowingToListQuery({ username, page });

  const followUnfollowUserHandler = async () => {
    const followUnfollow = await followUnfollowUserApi(
      userProfileData?.data.account._id
    );

    if (followUnfollow) {
      if (followUnfollow?.data.data.following) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }

      toast.success(followUnfollow?.data.message);
    }
  };

  const followersModalHandler = () => {
    setShowModal(true);
    setAction("Followers");
  };

  const followingModalHandler = () => {
    setShowModal(true);
    setAction("Following");
  };

  const closeModal = () => {
    setShowModal(false);
    setAction("");
  };

  useEffect(() => {
    const mainPage = document.querySelector("main");

    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + mainPage.scrollTop + 1 >= mainPage.scrollHeight;

      if (scrolledToBottom && myPosts?.data.hasNextPage) {
        setPage((prev) => prev + 1);
      }
    };

    mainPage.addEventListener("scroll", onScroll);

    return function () {
      mainPage.removeEventListener("scroll", onScroll);
    };
  }, [page, postsFetching]);

  return (
    <div
      className="max-w-3xl py-4 sm:py-10 mx-auto px-4 flex flex-col gap-10"
      id="scroll-page">
      {profileLoading ||
      userProfileLoading ||
      followersLoading ||
      followingLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-full flex gap-12 items-center justify-evenly">
            <div className="w-28 h-28 rounded-full sm:w-40 sm:h-40">
              <img
                src={
                  currentUserProfile
                    ? data?.data?.account.avatar.url
                    : userProfileData?.data?.account.avatar.url
                }
                alt="profile-image"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
            <div className="max-w-xs w-full flex flex-col gap-3">
              <div className="flex items-center gap-8">
                <h3 className="text-lg font-medium">
                  {currentUserProfile
                    ? data?.data?.account.username
                    : userProfileData?.data?.account.username}
                </h3>
                {currentUserProfile ? (
                  <Link
                    to={"/edit-profile"}
                    className="bg-gray-600 py-1 px-3 rounded-md text-white">
                    Edit Profile
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      className={`text-sm font-semibold ${
                        following && "bg-gray-500"
                      }`}
                      onClick={followUnfollowUserHandler}>
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Link
                      to={"/messages"}
                      className="bg-gray-500 py-2 px-4 rounded-md text-white text-sm font-semibold">
                      Message
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-8">
                <h5>
                  <span className="font-semibold text-[17px]">
                    {currentUserProfile
                      ? myPosts?.data?.totalPosts
                      : userPostsData?.data?.totalPosts}
                  </span>{" "}
                  posts
                </h5>
                <h5 onClick={followersModalHandler} className="cursor-pointer">
                  <span className="font-semibold text-[17px]">
                    {followersData?.data.totalFollowers}
                  </span>{" "}
                  followers
                </h5>
                <h5 onClick={followingModalHandler} className="cursor-pointer">
                  <span className="font-semibold text-[17px]">
                    {followingData?.data.totalFollowing}
                  </span>{" "}
                  following
                </h5>
                {showModal && (
                  <FollowStatsModal
                    action={action}
                    closeModal={closeModal}
                    followers={followersData?.data.followers}
                    followings={followingData?.data.following}
                  />
                )}
              </div>
              <h4 className="font-medium">
                {currentUserProfile
                  ? data?.data?.firstName
                  : userProfileData?.data?.firstName}{" "}
                {currentUserProfile
                  ? data?.data?.lastName
                  : userProfileData?.data?.lastName}
              </h4>
              <h4 className="text-sm">
                {currentUserProfile
                  ? data?.data?.bio
                  : userProfileData?.data?.bio}
              </h4>
            </div>
          </div>
        </div>
      )}

      <hr className="border-t-2 border-gray-300" />

      {postsError || userPostsError ? (
        <h3>Something went wrong with posts!</h3>
      ) : postsLoading || userPostsLoading ? (
        <Loader />
      ) : currentUserProfile ? (
        myPosts ? (
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
        ) : null
      ) : userPostsData ? (
        <div className="w-full">
          {userPostsData?.data?.posts.length <= 0 ? (
            <div className="w-full h-40 flex justify-center items-center">
              <h2 className="font-semibold text-gray-300 text-2xl">
                No Posts Yet
              </h2>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-1">
                {userPostsData?.data?.posts.map((post) => (
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
