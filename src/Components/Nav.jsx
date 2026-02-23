import React from "react";
import API from "../api/api";

const Nav = ({ user ,handleLogout }) => {
    

  return (
    <>
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {user ? (
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Wellcome, {user.name} 👋🏻
              </h2>
              <span className="text-sm text-gray-500 pl-8">{user.email}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">No user logged in</span>
          )}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Nav;
