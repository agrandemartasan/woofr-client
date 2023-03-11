import { useContext, useEffect, useState } from "react";
import {
  getAllUsers,
  getFriends,
  getInvitesSent,
  sendInvite,
  unfriendUser
} from "../api";
import FriendsSection from "../components/FindFriends/FriendsSection";
import Loading from "../components/Loading/Loading";
import { UserContext } from "../context/user.context";

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

  if (!loggedUser || !filteredUsers || !allUsers || !friends || !invitedUsers)
    return <Loading />;
  return (
    <>
      <FriendsSection
        filteredUsers={filteredUsers}
        selectedParish={selectedParish}
        handleParishChange={handleParishChange}
        checkFriendshipStatus={checkFriendshipStatus}
        handleAddFriend={handleAddFriend}
        handleRemoveFriend={handleRemoveFriend}
      />
    </>
  );
}

export default FindFriends;
