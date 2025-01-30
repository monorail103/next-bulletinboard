import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-5 text-white">
      <h1 className="text-4xl m-0">My Bulletin Board</h1>
      <nav>
        <ul className="list-none p-0 flex gap-4">
          <li><a href="/" className="text-white no-underline">Home</a></li>
          <li><a href="/about" className="text-white no-underline">About</a></li>
          <li><a href="/contact" className="text-white no-underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;