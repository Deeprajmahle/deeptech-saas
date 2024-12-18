  // src/components/Sidebar.js
  import React from 'react';

  const Sidebar = () => {
    return (
      <aside className="w-64 bg-gray-100 h-full shadow-md">
        <nav>
          <ul>
            <li className="p-4">Dashboard</li>
            <li className="p-4">Analytics</li>
            <li className="p-4">Settings</li>
          </ul>
        </nav>
      </aside>
    );
  };

  export default Sidebar;