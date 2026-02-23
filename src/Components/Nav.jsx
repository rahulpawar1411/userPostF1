import React, { useState, useEffect } from "react";

const Nav = ({ user, handleLogout }) => {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 60) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 transition-transform duration-300 ${
        navVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        {user ? (
          <>
            <h2 className="text-sm sm:text-base font-semibold text-slate-100 truncate">
              Welcome, {user.name}
            </h2>
            <span className="text-xs text-slate-400 truncate hidden sm:inline">
              {user.email}
            </span>
          </>
        ) : (
          <span className="text-sm text-slate-400">Not logged in</span>
        )}
      </div>
      {user && (
        <button
          onClick={handleLogout}
          className="shrink-0 text-xs font-medium text-red-300 hover:text-red-200 bg-red-500/20 hover:bg-red-500/30 px-2.5 py-1.5 rounded-lg border border-red-400/20 transition active:scale-95"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
