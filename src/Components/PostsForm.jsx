import React, { useState } from "react";
import API from "../api/api";
import { useAlert } from "./CustomAlert";

export default function PostsForm() {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({ title: "", description: "", img: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/post", form);
      showAlert("Post created!", "success");
      setForm({ title: "", description: "", img: "" });
    } catch (err) {
      showAlert(err.response?.data || "Error creating post", "error");
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">New post</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Post title"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="What's on your mind?"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="img">
            Image URL
          </label>
          <input
            id="img"
            name="img"
            type="url"
            value={form.img}
            onChange={handleChange}
            placeholder="https://…"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2.5 rounded-xl transition active:scale-[0.98]"
        >
          Create post
        </button>
      </form>
    </div>
  );
}
