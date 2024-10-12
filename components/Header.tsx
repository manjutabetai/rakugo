import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <img src="/logo.png" alt="Logo" className="h-20" /> {/* ロゴイメージ */}
      <nav className="flex space-x-4">
        <a href="#about" className="text-black font-bold">
          about
        </a>
        <a href="#info" className="text-black font-bold">
          info
        </a>
        <a href="#generate" className="text-black font-bold">
          generate
        </a>
      </nav>
    </header>
  );
};

export default Header;
