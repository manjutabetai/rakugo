import React from "react";

const Header = () => {
  return (
    <header className="relative items-center px-12 py-8">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <img src="/logo.png" alt="Logo" className="h-20" /> {/* ロゴイメージ */}
        <nav className="flex gap-8 justify-start ">
          <a href="#about" className=" font-bold">
            about
          </a>
          <a href="#info" className=" font-bold">
            info
          </a>
          <a href="#generate" className=" font-bold">
            generate
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
