import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../Components/PostsForm";
import API from "../api/api";
import Nav from "../Components/Nav";
import PostsList from "../Components/PostsList";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await API.get("/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.get("/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-cyan-500/50 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav user={user} handleLogout={handleLogout} />

      <div className="flex-1 pt-20 sm:pt-24 lg:pt-28 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:w-[340px] shrink-0 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <Posts />
          </aside>
          <main className="flex-1 min-h-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="h-full min-h-[400px] lg:min-h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <PostsList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
