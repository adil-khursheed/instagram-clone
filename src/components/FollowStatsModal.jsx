import { IoClose } from "react-icons/io5";
import { Button } from "./index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useFollowUnfollowUserMutation } from "../features/follow/followApiSlice";

const FollowStatsModal = ({ action, closeModal, followers, followings }) => {
  const user = useSelector(selectCurrentUser);

  const [followUnfollowUserApi] = useFollowUnfollowUserMutation();

  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-80 z-10"
        onClick={closeModal}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white max-w-md w-full rounded-md overflow-hidden">
        <div className="flex justify-center items-center w-full p-3 border-b relative">
          <h4 className="font-bold text-lg text-slate-800">
            {action === "Followers" ? "Followers" : "Following"}
          </h4>
          <button className="absolute right-3 text-2xl" onClick={closeModal}>
            <IoClose />
          </button>
        </div>
        <div className="h-96 overflow-x-hidden overflow-y-scroll custom-scrollbar">
          {action === "Followers" ? (
            followers.length > 0 ? (
              followers.map((follower) => (
                <div
                  key={follower._id}
                  className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full">
                      <Link to={`/${follower?.username}`}>
                        <img
                          src={follower?.avatar.url}
                          alt=""
                          className="w-full h-full rounded-full object-cover object-top"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/${follower?.username}`}>
                        <h2 className="font-semibold text-lg">
                          {follower?.username}
                        </h2>
                      </Link>
                      <h3 className="font-medium text-sm text-gray-500">
                        {follower?.profile.firstName}{" "}
                        {follower?.profile.lastName}
                      </h3>
                    </div>
                  </div>
                  {follower._id !== user._id && (
                    <Button
                      textColor="text-gray-200"
                      className={`${
                        follower.isFollowing ? "bg-gray-600" : "bg-blue-600"
                      }`}
                      onClick={async () =>
                        await followUnfollowUserApi(follower._id)
                      }>
                      {follower.isFollowing ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center font-semibold text-gray-400 text-lg">
                <p>No followers yet!</p>
              </div>
            )
          ) : followings.length > 0 ? (
            followings.map((following) => (
              <div
                key={following._id}
                className="flex items-center justify-between p-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full">
                    <img
                      src={following?.avatar.url}
                      alt=""
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">
                      {following?.username}
                    </h2>
                    <h3 className="font-medium text-sm text-gray-500">
                      {following?.profile.firstName}{" "}
                      {following?.profile.lastName}
                    </h3>
                  </div>
                </div>
                <Button bgColor="bg-gray-600" textColor="text-gray-200">
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center font-semibold text-gray-400 text-lg">
              <p>No following yet!</p>
            </div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default FollowStatsModal;
