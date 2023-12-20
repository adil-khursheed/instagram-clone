import { useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../features/posts/postApiSlice";
import { Loader, PostCard } from "../components/index";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useGetAllPostsQuery(page);

  const posts = data?.data.posts ?? [];

  const handleScroll = () => {
    if (
      window.innerHeight + document.querySelector("main").scrollTop + 1 >=
        document.querySelector("main").scrollHeight &&
      !isFetching
    ) {
      console.log("Fetching more data...");
      setPage(page + 1);
    }
  };

  useEffect(() => {
    document.querySelector("main").addEventListener("scroll", handleScroll);

    return function () {
      document
        .querySelector("main")
        .removeEventListener("scroll", handleScroll);
    };
  }, [page, isFetching]);

  if (isError) {
    return <p>Something Went Wrong!</p>;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (isFetching) console.log("Fetching");

  return (
    <div className="max-w-3xl py-4 sm:py-5 mx-auto px-4 flex flex-col gap-7">
      {posts ? (
        posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
            <hr />
          </div>
        ))
      ) : (
        <div>
          <p>No Posts Yet!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
