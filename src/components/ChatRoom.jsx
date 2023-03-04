import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getChatMessages, postMessage } from "../api";

const ChatRoom = ({ chatId }) => {
  const { loggedUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getChatMessages(chatId);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  }, [chatId]);

  async function handleNewMessageSubmit(event) {
    event.preventDefault();
    try {
      const response = await postMessage(chatId, loggedUser.userId, newMessage);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((message) => (
            <div key={message._id}>
              <p>{message.content}</p>
              <small>{message.sender.username}</small>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleNewMessageSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
