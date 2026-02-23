import React, { useEffect, useState } from "react";
import API from "../api/api";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/post");
        setPosts(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/post/${id}`);
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (post) => {
    setEditPost({ ...post });
  };

  const saveUpdate = async () => {
    if (!editPost) return;
    try {
      const res = await API.put(`/post/${editPost._id}`, {
        title: editPost.title,
        description: editPost.description,
        img: editPost.img,
      }, { withCredentials: true });
      setPosts((p) => p.map((x) => (x._id === editPost._id ? res.data : x)));
      setEditPost(null);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto hide-scrollbar">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500/50 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading posts…</p>
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm text-center py-8">{String(error)}</p>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <article
              key={post._id}
              className="flex flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {post.img && (
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-12 h-12 sm:w-36 sm:h-36 object-cover rounded-full sm:rounded-lg shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-slate-100 mb-0.5 sm:mb-1 truncate">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-slate-400 text-sm">No posts yet.</p>
          <p className="text-slate-500 text-xs mt-1">Create your first post on the left.</p>
        </div>
      )}

      {/* Edit modal */}
      {editPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setEditPost(null)}
        >
          <div
            className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Edit post</h3>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
              placeholder="Title"
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 mb-3"
            />
            <textarea
              value={editPost.description}
              onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 mb-3 resize-none"
            />
            <input
              type="text"
              value={editPost.img}
              onChange={(e) => setEditPost({ ...editPost, img: e.target.value })}
              placeholder="Image URL"
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditPost(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15 transition active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdate}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium transition active:scale-95"
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
