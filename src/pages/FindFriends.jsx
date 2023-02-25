import NavBar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getAllUsers, sendInvite, getFriends, unfriendUser } from "../api";
import parishList from "../utils/parish.json";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue
} from "@chakra-ui/react";

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

  const isInvited = (userId) => {
    return invitedUsers.includes(userId);
  };

  const isFriend = (userId) => {
    return friends.some((friend) => friend._id === userId);
  };

  useEffect(() => {
    async function handleGetAllUsers() {
      const response = await getAllUsers();
      if (loggedUser) {
        const userFriends = await getFriends(loggedUser._id);
        console.log(userFriends.data);
        setAllUsers(
          response.data.filter((foundUser) => loggedUser._id !== foundUser._id)
        );
        setFriends(userFriends.data);
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
      <NavBar />
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

        <Center py={6}>
          <Box>
            {friends.length &&
              filteredUsers.length &&
              filteredUsers.map((user) => (
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
            {/* {filteredUsers.length ? (
              filteredUsers.map((el) => {
                return (
                  <li key={el._id}>
                    <h3>{el.username}</h3>
                    <h4>{el.info.locationByParish}</h4>
                  </li>
                );
              })
            ) : (
              <>Loading...</>
            )} */}
          </Box>
        </Center>
      </div>
    </>
  );
}

export default FindFriends;
