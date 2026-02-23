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
        console.log(res.data);
      } catch (err) {
        console.error(
          "Profile fetch error:",
          err.response?.data || err.message
        );
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
      const res = await API.get("/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <Nav user={user} handleLogout={handleLogout} />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side – Post Form */}
        <div className="w-full md:w-1/3">
          <Posts />
        </div>

        {/* Right Side – Post List (Scrollable) */}
        <div
          className="w-full md:w-2/3 h-[500px] overflow-y-auto 
             border border-gray-800 rounded-2xl p-6 
             shadow-xl"
        >
          <PostsList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
