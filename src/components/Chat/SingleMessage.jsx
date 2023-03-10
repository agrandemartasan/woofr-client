import { Box, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

function SingleMessage({ message, sender }) {
  return (
    <>
      {sender === "user" && (
        <Box
          d="flex"
          w="45%"
          px={3}
          py={2}
          mb={3}
          borderRadius="lg"
          borderWidth="1px"
          alignItems="flex-end"
          key={message._id}
          marginLeft="auto"
          bg="brand.100"
          color="brand.900"
        >
          <Text>{message.content}</Text>
          <small>
            You • {formatDistanceToNow(new Date(message.createdAt))} ago
          </small>
        </Box>
      )}
      {sender === "friend" && (
        <Box
          d="flex"
          w="45%"
          px={3}
          py={2}
          mb={3}
          borderRadius="lg"
          borderWidth="1px"
          key={message._id}
          marginRight="auto"
          bg="brand.300"
          color="brand.900"
        >
          <Text>{message.content}</Text>
          <small>
            {message.sender.username}•{" "}
            {formatDistanceToNow(new Date(message.createdAt))} ago
          </small>
        </Box>
      )}
    </>
  );
}

export default SingleMessage;
