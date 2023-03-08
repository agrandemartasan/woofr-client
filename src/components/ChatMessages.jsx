import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { postMessage } from "../api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useColorModeValue
} from "@chakra-ui/react";
import SingleMessage from "./SingleMessage";

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

  return (
    <Box
      d={{ base: "flex", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={useColorModeValue("brand.50", "brand.600")}
      color={useColorModeValue("brand.700", "brand.200")}
      w={{ base: "100%", md: "68%" }}
      maxH="89.5vh"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        maxH="70vh"
        overflowY="scroll"
        flexDirection="column-reverse"
        mx={5}
      >
        <div>
          {messages.length === 0 ? (
            <small>No messages yet.</small>
          ) : (
            messages.map((message) => (
              <>
                {message.sender._id !== loggedUser._id ? (
                  <SingleMessage message={message} sender="friend" />
                ) : (
                  <SingleMessage message={message} sender="user" />
                )}
              </>
            ))
          )}
        </div>
      </Flex>
      <HStack bg="brand.400" mt={7} p={3} w="100%" borderRadius="lg">
        <FormControl>
          <Input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write your message..."
          />
        </FormControl>

        <Button
          colorScheme="brand"
          w="25%"
          type="submit"
          onClick={handleSubmitNewMessage}
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatMessages;
