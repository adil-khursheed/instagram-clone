import { useState } from "react";
import { useGetAllPostsQuery } from "../features/posts/postApiSlice";
import { Loader, PostCard } from "../components/index";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllPostsQuery(page);

  if (isError) {
    return <p>Something Went Wrong!</p>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl py-4 sm:py-10 mx-auto px-4 flex flex-col gap-10">
      {data ? (
        data?.data?.posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div>
          <p>No Posts Yet!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
