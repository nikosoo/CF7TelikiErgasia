import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const uniqueFriendIds = [...new Set(user.friends)];

    const friends = await Promise.all(
      uniqueFriendIds.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location }) => {
        return { _id, firstName, lastName, occupation, location };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fid) => fid !== friendId);
      friend.friends = friend.friends.filter((fid) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const uniqueFriendIds = [...new Set(user.friends)];

    const friends = await Promise.all(
      uniqueFriendIds.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location }) => {
        return { _id, firstName, lastName, occupation, location };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
