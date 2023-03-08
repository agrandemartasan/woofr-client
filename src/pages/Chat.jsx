import Nav from "../components/Nav";
import ChatList from "../components/ChatList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getChatMessages, getUserChats } from "../api";
import ChatMessages from "../components/ChatMessages";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import EmptyChatMessages from "../components/EmptyChatMessages";

function Chat() {
  const { loggedUser } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState({});

  function handleChangeActiveChat(chat) {
    setActiveChat(chat);
  }

  useEffect(() => {
    async function fetchChats() {
      const response = await getUserChats(loggedUser._id);
      setChats(response.data.chats);
    }
    if (loggedUser) {
      fetchChats();
    }
  }, [loggedUser, messages]);

  useEffect(() => {
    async function fetchMessages() {
      if (activeChat) {
        const response = await getChatMessages(activeChat._id);
        const messages = response.data;

        setMessages(messages);
      }
    }
    fetchMessages();
  }, [activeChat]);

  return (
    <>
      <Nav />
      <Flex
        justifyContent="space-between"
        w="100%"
        minH="91vh"
        py={5}
        px={5}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <ChatList
          chats={chats}
          activeChat={activeChat}
          handleChangeActiveChat={handleChangeActiveChat}
          latestMessage={latestMessage}
        />
        {activeChat ? (
          <ChatMessages
            loggedUser={loggedUser}
            chat={activeChat}
            messages={messages}
            setMessages={setMessages}
            setLatestMessage={setLatestMessage}
            activeChat={activeChat}
          />
        ) : (
          <EmptyChatMessages />
        )}
      </Flex>
    </>
  );
}

export default Chat;
