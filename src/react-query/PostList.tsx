import axios from "axios";
import { useEffect, useState } from "react";
import usePost from "./hooks/usePost";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<number>();
  const {
    data: posts,
    error,
    isLoading,
  } = usePost({ userId: user, page: page, pageSize: pageSize });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(event) => setUser(parseInt(event.target.value))}
        className="form-select mb-3"
        value={user}
      >
        <option value={""}></option>
        <option value={1}>User1</option>
        <option value={2}>User2</option>
        <option value={3}>User3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPage(page - 1)}
        className="btn btn-primary my-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary my-3 ms-3"
      >
        Next
      </button>
    </>
  );
};

export default PostList;
