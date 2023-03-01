import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getAllUsers, sendInvite, getFriends, unfriendUser } from "../api";
import parishList from "../utils/parish.json";
import UserCard from "../components/UserCard";

function FindFriends() {
  const { loggedUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedParish, setSelectedParish] = useState("");

  function handleParishChange(event) {
    setSelectedParish(event.target.value);
  }

  function checkFriendshipStatus(userId) {
    const isInvited = (userId) => {
      return invitedUsers.includes(userId);
    };

    const isFriend = (userId) => {
      return friends.some((friend) => friend._id === userId);
    };

    if (isInvited(userId)) return "InviteSent";
    if (isFriend(userId)) return "RemoveFriend";

    return "AddFriend";
  }

  useEffect(() => {
    async function handleGetAllUsers() {
      const response = await getAllUsers();
      if (loggedUser) {
        const userFriends = await getFriends(loggedUser._id);

        if (userFriends.length > 0) {
          setAllUsers(
            response.data.filter(
              (foundUser) => loggedUser._id !== foundUser._id
            )
          );
          setFriends(userFriends.data);
        } else {
          setAllUsers(
            response.data.filter(
              (foundUser) => loggedUser._id !== foundUser._id
            )
          );
        }
      }
    }
    handleGetAllUsers();
  }, [loggedUser]);

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
      await sendInvite({ sender: loggedUser, recipient: friendId });
      setInvitedUsers([...invitedUsers, friendId]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveFriend(friendId) {
    try {
      await unfriendUser(loggedUser, friendId);
      setFriends(friends.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <div>
        <label htmlFor="parish-select">Filter by parish:</label>
        <select
          id="parish-select"
          value={selectedParish}
          onChange={handleParishChange}
        >
          <option value="">All</option>
          {parishList.map((parish, index) => (
            <option key={index} value={parish}>
              {parish}
            </option>
          ))}
        </select>

        {filteredUsers.length &&
          filteredUsers.map((user) => (
            <>
              <UserCard
                userId={user._id}
                username={user.username}
                profilePicture={user.profilePicture}
                location={user.info.locationByParish}
                bio={user.info.bio}
                friendshipStatus={checkFriendshipStatus(user._id)}
                handleAddFriend={handleAddFriend}
                handleRemoveFriend={handleRemoveFriend}
              />
            </>
          ))}
      </div>
    </>
  );
}

export default FindFriends;
