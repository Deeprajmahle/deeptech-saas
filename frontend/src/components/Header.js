  // src/components/Header.js
  import React from 'react';

  const Header = () => {
    return (
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <div className="flex items-center">
          <input type="text" placeholder="Search..." className="border rounded p-2" />
          <img src="profile.jpg" alt="Profile" className="w-8 h-8 rounded-full ml-4" />
        </div>
      </header>
    );
  };

  export default Header;