  // src/components/ProfileCard.js
  import React from 'react';

  const ProfileCard = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <img src="profile.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
        <h2 className="text-center text-xl font-semibold mt-2">John Antony</h2>
        <p className="text-center text-gray-500">"IT Specialist"</p>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <p className="text-blue-500 text-lg">8.2</p>
            <p className="text-gray-500">Overall Rating</p>
          </div>
          <div className="text-center">
            <p className="text-blue-500 text-lg">75%</p>
            <p className="text-gray-500">Completed Projects</p>
          </div>
          <div className="text-center">
            <p className="text-blue-500 text-lg">10</p>
            <p className="text-grey-500">Proficient Skills</p>
          </div>
        </div>
      </div>
    );
  };

  export default ProfileCard;