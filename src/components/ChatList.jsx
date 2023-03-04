import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { createChat, getFriends } from "../api";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const { loggedUser } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFriends() {
      const response = await getFriends(loggedUser);
      setFriends(response.data);
    }
    if (loggedUser) {
      fetchFriends();
    }
  }, [loggedUser]);

  async function handleCreateChat(recipientId) {
    const response = await createChat(loggedUser._id, recipientId);
    console.log("response", response.data);
  }
  return (
    <ul>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <li key={friend._id}>
            {friend.username}
            <button onClick={() => handleCreateChat(friend._id)}>
              New Chat
            </button>
          </li>
        ))
      ) : (
        <li>No friends yet.</li>
      )}
    </ul>
  );
}

export default ChatList;
