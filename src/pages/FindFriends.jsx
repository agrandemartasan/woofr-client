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
    console.log(userId);
    debugger;
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
      await sendInvite({ senderId: loggedUser, recipientId: friendId });
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
        console.log("userFriends", userFriends.data);

        const invitesSent = await getInvitesSent(loggedUser._id);
        console.log("invitesSent", invitesSent.data);

        const filteredByStatus = invitesSent.data.filter(
          (item) => item.status === "pending"
        );
        console.log("filteredByStatus", filteredByStatus);

        const pendingInvitesUsers = filteredByStatus.map((user) => {
          return user.recipient;
        });
        console.log("pendingInvitesUsers", pendingInvitesUsers);

        /*       if (invitedUsers.length > 0) {
          setAllUsers(
            response.data.filter(
              (foundUser) => loggedUser._id !== foundUser._id
            )
          );


        } */

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
    allUsers.forEach((user) => {
      console.log("user", user);
      console.log("friends", friends);
      console.log("invitedUsers", invitedUsers);
      // console.log("isFriend(user._id)", isFriend(user._id));
      // console.log("isInvited(user._id)", isInvited(user._id));
      console.log("checkFriendshipStatus", checkFriendshipStatus(user._id));
    });
  }, [selectedParish, allUsers]);

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
