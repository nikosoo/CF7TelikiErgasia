import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);

    const response = await fetch(
      `http://localhost:3000/posts`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setPost("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className="w-full bg-purple-100 rounded-full px-4 py-2 outline-none focus:bg-purple-200 transition-colors"
        />
      </div>

      <hr className="my-5 border-purple-300" />

      <div className="flex justify-end">
        <button
          onClick={handlePost}
          disabled={!post}
          className="px-6 py-3 bg-purple-500 text-white rounded-full disabled:opacity-50 hover:bg-purple-600 transition-colors"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default MyPostWidget;
