import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getChatMessages, getUserChats } from "../api";
import ChatList from "../components/Chat/ChatList";
import ChatMessages from "../components/Chat/ChatMessages";
import EmptyChatMessages from "../components/Chat/EmptyChatMessages";
import Nav from "../components/Nav";
import { UserContext } from "../context/user.context";

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
