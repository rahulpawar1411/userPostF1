import React, { useState } from "react";
import axios from "axios";
import PostsList from "./PostsList";
import API from "../api/api";

export default function PostsForm() {
  const [form, setForm] = useState({ title: "", description: "", img: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/post", form);
      alert("Post created!");
      setForm({ title: "", description: "", img: "" });
    } catch (err) {
      alert(err.response?.data || "Error creating post");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4 bg-white p-4 rounded-xl m-10 shadow"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="img">
            Image URL
          </label>
          <input
            id="img"
            name="img"
            type="url"
            value={form.img}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            // required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
