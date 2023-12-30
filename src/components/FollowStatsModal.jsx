import { IoClose } from "react-icons/io5";

const FollowStatsModal = ({ action, closeModal, followers, followings }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-80"
        onClick={closeModal}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-w-md w-full rounded-md overflow-hidden">
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
              followers.map((follower) => console.log(follower))
            ) : (
              <div className="w-full h-full flex justify-center items-center font-semibold text-gray-400 text-lg">
                <p>No followers yet!</p>
              </div>
            )
          ) : followings.length > 0 ? (
            followings.map((following) => console.log(following))
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
