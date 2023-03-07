import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { postMessage } from "../api";
import { Box } from "@chakra-ui/react";

const ChatMessages = ({
  loggedUser,
  chat,
  messages,
  setMessages,
  setLatestMessage,
  activeChat
}) => {
  const [newMessage, setNewMessage] = useState("");

  function handleNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  async function handleSubmitNewMessage(event) {
    event.preventDefault();

    try {
      const response = await postMessage(chat._id, loggedUser._id, newMessage);
      console.log("response", response);
      setMessages([...messages, response.data]);
      setLatestMessage(response.data.content);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  /* useEffect(() => {
    if (chat) {
      console.log("chat.messages", chat.messages);
    }
  }, [chat]); */

  if (!chat) {
    return <div>Loading Messages</div>;
  }
  return (
    <Box
      d={{ base: "flex", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <div>
        {messages.length === 0 ? (
          <small>No messages yet.</small>
        ) : (
          messages.map((message) => (
            <div key={message._id}>
              <p>{message.content}</p>
              <small>
                {message.sender._id !== loggedUser._id
                  ? message.sender.username
                  : "You"}{" "}
                • {formatDistanceToNow(new Date(message.createdAt))} ago
              </small>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmitNewMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </Box>
  );
};

export default ChatMessages;
