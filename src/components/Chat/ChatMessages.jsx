import { useState } from "react";
import { postMessage } from "../../api";
import {
  Box,
  Button,
  Flex,
  FormControl,
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
  setLatestMessage
}) => {
  const [newMessage, setNewMessage] = useState("");

  function handleNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  async function handleSubmitNewMessage(event) {
    event.preventDefault();

    try {
      const response = await postMessage(chat._id, loggedUser._id, newMessage);
      setMessages([...messages, response.data]);
      setLatestMessage(response.data.content);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      d="flex"
      alignItems="center"
      flexDir="column"
      flexGrow={1}
      p={3}
      bg={useColorModeValue("brand.50", "brand.600")}
      color={useColorModeValue("brand.700", "brand.200")}
      w={{ base: "100%", md: "68%" }}
      minH="89vh"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        maxH="70vh"
        h="100%"
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
