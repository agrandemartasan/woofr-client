import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getAllUsers, sendInvite, getFriends, unfriendUser } from "../api";
import parishList from "../utils/parish.json";

function FindFriends({ userId }) {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedParish, setSelectedParish] = useState("");

  useEffect(() => {
    async function handleGetAllUsers() {
      const response = await getAllUsers();
      const userFriends = await getFriends(userId);
      setAllUsers(response.data.filter((user) => user._id !== userId));
      setFilteredUsers(response.data.filter((user) => user._id !== userId));
      setFriends(userFriends);
    }
    handleGetAllUsers();
  }, [userId]);

  useEffect(() => {
    if (selectedParish) {
      const filteredData = allUsers.filter(
        (user) => user.info.locationByParish === selectedParish
      );
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [selectedParish, allUsers]);

  async function handleAddFriend(friendId) {
    try {
      await sendInvite({ fromUser: userId, toUser: friendId });
      setInvitedUsers([...invitedUsers, friendId]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveFriend(friendId) {
    try {
      await unfriendUser(userId, friendId);
      setFriends(friends.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.error(error);
    }
  }

  const isInvited = (userId) => {
    return invitedUsers.includes(userId);
  };

  const isFriend = (userId) => {
    return friends.some((friend) => friend._id === userId);
  };

  function handleParishChange(event) {
    setSelectedParish(event.target.value);
  }

  return (
    <>
      <NavBar />
      <div>
        <label htmlFor="parish-select">Filter by parish:</label>
        <select
          id="parish-select"
          value={selectedParish}
          onChange={handleParishChange}
        >
          <option value="">All</option>
          {parishList.map((parish) => (
            <option key={parish} value={parish}>
              {parish}
            </option>
          ))}
        </select>

        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>
              {user.username}
              {isInvited(user._id) ? (
                <span>Invite Sent</span>
              ) : isFriend(user._id) ? (
                <button onClick={() => handleRemoveFriend(user._id)}>
                  Remove Friend
                </button>
              ) : (
                <button onClick={() => handleAddFriend(user._id)}>
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FindFriends;
