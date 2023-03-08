import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import LoadingChats from "./LoadingChats";

function ChatList({ chats, activeChat, handleChangeActiveChat }) {
  return (
    <>
      <Box
        d={{ base: "flex", md: "none" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg={useColorModeValue("brand.50", "brand.600")}
        w={{ base: "100%", md: "31%" }}
        h="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          color={useColorModeValue("brand.700", "brand.200")}
        >
          My Chats
        </Box>

        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg={useColorModeValue("brand.50", "brand.600")}
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => {
                return (
                  <Box
                    onClick={() => handleChangeActiveChat(chat)}
                    cursor="pointer"
                    bg={
                      activeChat && activeChat._id === chat._id
                        ? "brand.700"
                        : "brand.200"
                    }
                    color={
                      activeChat && activeChat._id === chat._id
                        ? "brand.50"
                        : "brand.900"
                    }
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text fontSize="lg"> {chat.users[0].username} </Text>
                    {chat.latestMessage && (
                      <Text fontSize="sm">
                        {chat.latestMessage.sender.username} said:{" "}
                        {chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </Stack>
          ) : (
            <LoadingChats />
          )}
        </Box>
      </Box>
    </>
  );
}

export default ChatList;
