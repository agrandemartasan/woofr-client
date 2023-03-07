import Nav from "../components/Nav";
import ChatList from "../components/ChatList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getChatMessages, getUserChats } from "../api";
import ChatMessages from "../components/ChatMessages";
import { Box, Flex, Text } from "@chakra-ui/react";

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
      <Flex justifyContent="space-between" w="100%" h="100%" p="10px">
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
            <Flex alignItems="center" justifyContent="center" h="100%">
              <Text fontSize="3xl" pb={3}>
                Click on one of your friends to chat
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Chat;
