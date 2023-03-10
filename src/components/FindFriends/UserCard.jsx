import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function UserCard({
  userId,
  username,
  profilePicture,
  location,
  bio,
  friendshipStatus,
  handleAddFriend,
  handleRemoveFriend
}) {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent="space-between"
      w="320px"
      h="320px"
      bg={useColorModeValue("brand.50", "brand.600")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
    >
      <Avatar
        size={"xl"}
        src={profilePicture}
        alt={username}
        mb={4}
        mx={"auto"}
        pos={"relative"}
      />
      <div style={{ margin: "auto" }}>
        <Heading
          fontSize={"2xl"}
          fontFamily={"body"}
          color={useColorModeValue("brand.900", "brand.50")}
        >
          {username}
        </Heading>
        <Text
          fontWeight={600}
          color={useColorModeValue("brand.700", "brand.300")}
        >
          {location}
        </Text>
      </div>

      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"brand.400"}
          color={"brand.50"}
          _hover={{
            bg: "brand.500"
          }}
          _focus={{
            bg: "brand.500"
          }}
        >
          <Link to={`/profile/${userId}`}>View Profile</Link>
        </Button>
        <Button
          onClick={
            friendshipStatus === "RemoveFriend"
              ? () => handleRemoveFriend(userId)
              : friendshipStatus === "AddFriend"
              ? () => handleAddFriend(userId)
              : null
          }
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"brand.400"}
          color={"brand.50"}
          _hover={{
            bg: "brand.500"
          }}
          _focus={{
            bg: "brand.500"
          }}
        >
          {friendshipStatus === "InviteSent" && "Invite Sent"}
          {friendshipStatus === "RemoveFriend" && "Remove Friend"}
          {friendshipStatus === "AddFriend" && "Add Friend"}
        </Button>
      </Stack>
    </Flex>
  );
}
