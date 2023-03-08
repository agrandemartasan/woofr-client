import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import {
  getAllUsers,
  sendInvite,
  getFriends,
  unfriendUser,
  getInvitesSent
} from "../api";
import parishList from "../utils/parish.json";
import UserCard from "../components/UserCard";
import {
  Box,
  Flex,
  FormLabel,
  Select,
  useColorModeValue
} from "@chakra-ui/react";

function FindFriends() {
  const { loggedUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedParish, setSelectedParish] = useState("");

  // helper functions
  function filterUsersByParish(parish) {
    return allUsers.filter((user) => user.info.locationByParish === parish);
  }

  function handleParishChange(event) {
    setSelectedParish(event.target.value);
  }

  function checkFriendshipStatus(userId) {
    // console.log(userId);

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

  async function handleAddFriend(friendId) {
    try {
      const newInvite = await sendInvite({
        sender: loggedUser._id,
        recipient: friendId
      });
      console.log("newInvite", newInvite);
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

  // useEffects
  // get users from API
  useEffect(() => {
    async function handleGetAllUsers() {
      const response = await getAllUsers();
      if (loggedUser) {
        const userFriends = await getFriends(loggedUser._id);
        // console.log("userFriends", userFriends.data);

        const invitesSent = await getInvitesSent(loggedUser._id);
        const filteredByStatus = invitesSent.data.filter(
          (item) => item.status === "pending"
        );
        const pendingInvitesUsers = filteredByStatus.map((user) => {
          return user.recipient;
        });

        setInvitedUsers(pendingInvitesUsers);

        if (userFriends.data.length > 0) {
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
      const filteredData = filterUsersByParish(selectedParish);
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [selectedParish, allUsers]);

  return (
    <>
      <Nav />
      <Flex
        alignItems="flex-start"
        gap={6}
        w="100%"
        minH="91vh"
        py={5}
        px={5}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <Box
          p={3}
          bg={useColorModeValue("brand.50", "brand.600")}
          w="31%"
          h="100%"
          borderRadius="lg"
          borderWidth="1px"
        >
          <FormLabel htmlFor="parish-select">Filter by parish:</FormLabel>
          <Select
            id="parish-select"
            value={selectedParish}
            onChange={handleParishChange}
            placeholder={"All"}
          >
            {parishList.map((parish, index) => (
              <option key={index} value={parish}>
                {parish}
              </option>
            ))}
          </Select>
        </Box>
        <Flex justifyContent="flex-start" gap={2} w="100%" h="100%">
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
        </Flex>
      </Flex>
    </>
  );
}

export default FindFriends;
