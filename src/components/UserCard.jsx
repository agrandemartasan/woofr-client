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
    <Center>
      <Box
        maxW={"320px"}
        w={"full"}
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
          pos={"relative"}
        />
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
          mb={4}
        >
          {location}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("brand.700", "brand.400")}
          px={3}
        >
          {bio}
        </Text>

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
            View Profile
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
      </Box>
    </Center>
  );
}
