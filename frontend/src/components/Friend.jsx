import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath, showButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isSelf = friendId === _id;
  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (isSelf) {
      console.log("Cannot add/remove yourself as a friend.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <UserImage image={userPicturePath} size="60" />
        <div
          onClick={() => navigate(`/profile/${friendId}`)}
          className="cursor-pointer"
        >
          <p className="text-lg font-medium text-gray-800 hover:text-blue-500 m-0">
            {name}
          </p>
          <p className="text-sm text-gray-500 m-0">{subtitle}</p>
        </div>
      </div>
      {showButton && !isSelf && (
        <button
          onClick={patchFriend}
          className={`p-2 rounded-full ${
            isFriend ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {isFriend ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v12m-6-6h12"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Friend;
