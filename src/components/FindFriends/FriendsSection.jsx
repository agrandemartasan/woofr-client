import {
  Box,
  Flex,
  FormLabel,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
import UserCard from "./UserCard";
import parishList from "../../utils/parish.json";

function FriendsSection({
  filteredUsers,
  selectedParish,
  handleParishChange,
  checkFriendshipStatus,
  handleAddFriend,
  handleRemoveFriend
}) {
  return (
    <Flex
      alignItems={{ base: "center", md: "flex-start" }}
      flexDir={{ base: "column", md: "row" }}
      gap={6}
      w="100%"
      minH="91vh"
      py={5}
      px={5}
      bg={useColorModeValue("brand.100", "brand.850")}
    >
      <Box
        p={3}
        bg={useColorModeValue("brand.50", "brand.600")}
        w={{ base: "100%", md: "31%" }}
        h="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <FormLabel htmlFor="parish-select">Filter by parish:</FormLabel>
        <Select
          id="parish-select"
          value={selectedParish}
          onChange={handleParishChange}
          placeholder={"All"}
        >
          {parishList.map((parish, index) => (
            <option key={index} value={parish}>
              {parish}
            </option>
          ))}
        </Select>
      </Box>
      <Flex
        justifyContent={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
        gap={2}
        w="100%"
        h="100%"
      >
        {filteredUsers.length &&
          filteredUsers.map((user) => (
            <>
              <UserCard
                userId={user._id}
                username={user.username}
                profilePicture={user.profilePicture}
                location={user.info.locationByParish}
                bio={user.info.bio}
                friendshipStatus={checkFriendshipStatus(user._id)}
                handleAddFriend={handleAddFriend}
                handleRemoveFriend={handleRemoveFriend}
              />
            </>
          ))}
      </Flex>
    </Flex>
  );
}

export default FriendsSection;
