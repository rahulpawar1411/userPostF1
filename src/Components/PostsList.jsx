import React, { useEffect, useState } from "react";
import API from "../api/api";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [editPost, setEditPost] = useState(null);

  // ✅ Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/post");
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // ✅ Delete Post
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/post/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (post) => {
    setEditPost({ ...post }); // copy current post data
  };

  // ✅ Save Updated Post
  const saveUpdate = async () => {
    try {
      const res = await API.put(
        `/post/${editPost._id}`,
        {
          title: editPost.title,
          description: editPost.description,
          img: editPost.img,
        },
        { withCredentials: true }
      );

      setPosts(posts.map((p) => (p._id === editPost._id ? res.data : p)));
      setEditPost(null); // close modal
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  return (
    <div
      className="p-6 overflow-y-auto h-[90vh] hide-scrollbar "
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>
        {`
      /* ✅ Chrome, Safari, Edge ke liye */
      div::-webkit-scrollbar {
        display: none;
      }
    `}
      </style>

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col md:flex-row items-start gap-4 border-b pb-5 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
            >
              {/* Left: Image */}
              {post.img && (
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full md:w-40 h-32 object-cover rounded-lg shadow-sm"
                />
              )}

              {/* Right: Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {post.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {post.description}
                </p>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl text-center shadow ">
          <p className="text-gray-500">
            No posts found. Create your first post.
          </p>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Post</h2>

            <input
              type="text"
              value={editPost.title}
              onChange={(e) =>
                setEditPost({ ...editPost, title: e.target.value })
              }
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              value={editPost.description}
              onChange={(e) =>
                setEditPost({ ...editPost, description: e.target.value })
              }
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={editPost.img}
              onChange={(e) =>
                setEditPost({ ...editPost, img: e.target.value })
              }
              placeholder="Image URL"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditPost(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
