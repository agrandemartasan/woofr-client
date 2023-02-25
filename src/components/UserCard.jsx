import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue
} from "@chakra-ui/react";

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
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
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
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {username}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {location}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {bio}
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200"
            }}
          >
            View Profile
          </Button>
          <Button
            onClick={
              friendshipStatus === "RemoveFriend"
                ? handleRemoveFriend(userId)
                : friendshipStatus === "AddFriend"
                ? handleAddFriend(userId)
                : null
            }
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500"
            }}
            _focus={{
              bg: "blue.500"
            }}
          >
            {friendshipStatus === "InviteSent" && "Invite Sent"}
            {friendshipStatus === "RemoveFriend" && "Remove Friend"}
            {friendshipStatus === "AddFriend" && "Add Friend"}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
