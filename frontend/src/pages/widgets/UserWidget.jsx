import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiArrowRight, FiMapPin, FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId, token]);

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName, location, occupation, friends, picturePath } =
    user;

  const handleProfileNavigation = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="bg-purple-50 rounded-lg shadow-lg p-6">
      {/* FIRST ROW */}
      <button
        onClick={handleProfileNavigation}
        className="w-full flex justify-between items-center gap-4 pb-4 cursor-pointer hover:bg-purple-100 transition-colors duration-300 focus:outline-none"
        aria-label={`Go to profile of ${firstName} ${lastName}`}
      >
        <div className="flex items-center gap-4">
          <div>
            <h4 className="text-xl font-semibold text-purple-800">
              {firstName} {lastName}
            </h4>
            <p className="text-purple-600">{friends?.length || 0} friends</p>
          </div>
        </div>
        <FiArrowRight className="h-6 w-6 text-purple-600" />
      </button>

      <hr className="my-4 border-purple-200" />

      {/* SECOND ROW */}
      <div className="py-4">
        <div className="flex items-center gap-4 mb-2">
          <FiMapPin className="h-6 w-6 text-purple-600" />
          <p className="text-purple-700">{location}</p>
        </div>
        <div className="flex items-center gap-4">
          <FiBriefcase className="h-6 w-6 text-purple-600" />
          <p className="text-purple-700">{occupation}</p>
        </div>
      </div>

      <hr className="my-4 border-purple-200" />
    </div>
  );
};

export default UserWidget;
