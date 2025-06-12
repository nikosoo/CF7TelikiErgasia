import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate__animated animate__fadeIn">
          {/* User Profile and Friend List */}
          <div className="md:col-span-1 space-y-8">
            {/* User Profile */}
            <div className="bg-purple-200 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-600 text-white">
                <h3 className="text-lg font-semibold">User Profile</h3>
              </div>
              <div className="border-t border-purple-300 px-6 py-4">
                <UserWidget userId={userId} />
              </div>
            </div>

            {/* Friend List */}
            <div className="bg-purple-200 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-600 text-white">
                <h3 className="text-lg font-semibold">Friends</h3>
              </div>
              <div className="border-t border-purple-300 px-6 py-4">
                <FriendListWidget userId={userId} isProfilePage={true} />
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="md:col-span-2 space-y-8">
            {/* Posts */}
            <div className="bg-purple-200 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-600 text-white">
                <h3 className="text-lg font-semibold">Posts</h3>
              </div>
              <div className="border-t border-purple-300 px-6 py-4">
                <PostsWidget userId={userId} isProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
