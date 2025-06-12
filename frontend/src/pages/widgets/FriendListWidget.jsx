import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import Friend from "../../components/Friend";

const FriendListWidget = ({ userId, isProfilePage }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId, token, dispatch]);

  if (!friends || friends.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white border border-purple-200 rounded-lg shadow-lg">
      <h2 className="text-purple-700 text-xl font-semibold mb-6">
        Friend List
      </h2>
      <div className="flex flex-col gap-6">
        {friends.map((friend, index) => (
          <Friend
            key={friend._id || index} // Use index as a fallback key
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            showButton={!isProfilePage}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendListWidget;
