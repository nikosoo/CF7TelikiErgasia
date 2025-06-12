import Navbar from "../NavBar/Navbar";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate__animated animate__fadeIn">
          {/* User Profile and Friend List */}
          <div className="md:col-span-1 space-y-8">
            {/* User Profile */}
            <div className="bg-purple-50 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-700 text-white">
                <h3 className="text-lg font-semibold">User Profile</h3>
              </div>
              <div className="border-t border-purple-200 px-6 py-4">
                <UserWidget userId={_id} picturePath={picturePath} />
              </div>
            </div>

            {/* Friend List */}
            <div className="bg-purple-50 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-700 text-white">
                <h3 className="text-lg font-semibold">Friends</h3>
              </div>
              <div className="border-t border-purple-200 px-6 py-4">
                <FriendListWidget userId={_id} isProfilePage={false} />
              </div>
            </div>
          </div>

          {/* My Posts and Posts */}
          <div className="md:col-span-2 space-y-8">
            {/* My Posts */}
            <div className="bg-purple-50 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-700 text-white">
                <h3 className="text-lg font-semibold">My Posts</h3>
              </div>
              <div className="border-t border-purple-200 px-6 py-4">
                <MyPostWidget picturePath={picturePath} />
              </div>
            </div>

            {/* Posts */}
            <div className="bg-purple-50 shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-purple-700 text-white">
                <h3 className="text-lg font-semibold">Posts</h3>
              </div>
              <div className="border-t border-purple-200 px-6 py-4">
                <PostsWidget userId={_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
