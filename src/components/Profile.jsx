import { Link } from "react-router-dom";
import { useGetMyProfileQuery } from "../features/profile/profileSlice";
import { Loader } from "./index";
import { useGetMyPostsQuery } from "../features/posts/postSlice";

const Profile = () => {
  const { data, error, isLoading } = useGetMyProfileQuery();
  console.log(data);

  const { data: myPosts } = useGetMyPostsQuery();
  console.log(myPosts);

  if (error) {
    return <h3>Something went wrong</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl my-10 mx-auto px-4  flex flex-col gap-10">
      <div className="flex gap-5 items-center">
        <div className="w-28 h-28 rounded-full">
          <img
            src={data.data.account.avatar.url}
            alt="profile-image"
            className="w-full rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-4">
            <h3>{data.data.account.username}</h3>
            <Link
              to={"/edit-profile"}
              className="bg-gray-600 py-1 px-3 rounded-md text-white">
              Edit Profile
            </Link>
          </div>
          <div className="flex items-center justify-around gap-4">
            <h5>{myPosts.data.totalPosts} Posts</h5>
            <h5>{data.data.followersCount} Followers</h5>
            <h5>{data.data.followingCount} Following</h5>
          </div>
          <h4>
            {data.data.firstName} {data.data.lastName}
          </h4>
          <h4>{data.data.bio}</h4>
        </div>
      </div>
      <div className="w-full">
        {myPosts.data.posts.length <= 0 ? (
          <div className="w-full h-40 flex justify-center items-center">
            <h2 className="font-semibold text-gray-300 text-2xl">
              No Posts Yet
            </h2>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
