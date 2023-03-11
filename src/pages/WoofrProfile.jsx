import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { UserContext } from "../context/user.context";
import { sendInvite, unfriendUser } from "../api";

function WoofrProfile() {
  const { loggedUser } = useContext(UserContext);
  const { userId } = useParams();

  const [loggedUserData, setLoggedUserData] = useState({});
  const [userFriendshipStatus, setUserFriendshipStatus] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState(
    new Date(Date.now().toString().slice(10))
  );
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [isNeuteredOrSpayed, setIsNeuteredOrSpayed] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [size, setSize] = useState("");

  function checkFriendshipStatus(userId) {
    //Todo: check for invites from other users
    const isInvited = (userId) => {
      return loggedUserData.invitesSent?.some(
        (user) => user.recipient === userId
      );
    };

    const isFriend = (userId) => {
      return loggedUserData.friends?.some((friend) => friend._id === userId);
    };

    if (isInvited(userId)) return "InviteSent";
    if (isFriend(userId)) return "RemoveFriend";

    return "AddFriend";
  }
  async function handleAddFriend(friendId) {
    try {
      const newInvite = await sendInvite({
        sender: loggedUser._id,
        recipient: friendId
      });
      setUserFriendshipStatus("InviteSent");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveFriend(friendId) {
    try {
      await unfriendUser(loggedUser, friendId);
      setUserFriendshipStatus("RemoveFriend");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(userId);
      setUsername(response.data.username);
      setProfilePicture(response.data.profilePicture);
      setLocation(response.data.info.locationByParish);
      setBio(response.data.info.bio);
      setBirthday(response.data.info.birthday);
      setGender(response.data.info.gender);
      setBreed(response.data.info.breed);
      setIsNeuteredOrSpayed(response.data.info.isNeuteredOrSpayed);
      setIsVaccinated(response.data.info.isVaccinated);
      setIsTrained(response.data.info.isTrained);
      setSize(response.data.info.size);
    }

    async function getOwnUserDetails() {
      if (loggedUser) {
        const loggedUserResponse = await getUser(loggedUser._id);
        setLoggedUserData(loggedUserResponse.data);
        console.log("loggedUserResponse.data", loggedUserResponse.data);
      }
    }

    handleGetUserDetails(userId);
    getOwnUserDetails();
    setUserFriendshipStatus(checkFriendshipStatus(userId));
  }, [userId, loggedUser]);

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        w="100%"
        minH="91vh"
        py={3}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <Flex
          alignItems="flex-end"
          justifyContent="flex-end"
          w="100%"
          px={"5%"}
          bg={useColorModeValue("brand.100", "brand.850")}
        >
          {loggedUser && loggedUser._id !== userId && userFriendshipStatus && (
            <Button
              onClick={
                userFriendshipStatus === "RemoveFriend"
                  ? () => handleRemoveFriend(userId)
                  : userFriendshipStatus === "AddFriend"
                  ? () => handleAddFriend(userId)
                  : null
              }
              w={"150px"}
              my={2}
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
              {userFriendshipStatus === "InviteSent" && "Invite Sent"}
              {userFriendshipStatus === "RemoveFriend" && "Remove Friend"}
              {userFriendshipStatus === "AddFriend" && "Add Friend"}
            </Button>
          )}
        </Flex>
        <Flex
          alignItems="flex-start"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
          w="100%"
          gap={4}
          px={"5%"}
        >
          <Box
            p={3}
            bg={useColorModeValue("brand.50", "brand.600")}
            w={{ base: "100%", md: "30%" }}
            borderRadius="lg"
            borderWidth="1px"
          >
            <Image
              src={profilePicture}
              alt={username}
              w="100%"
              borderRadius="lg"
              borderWidth="1px"
            />
          </Box>
          <Flex
            flexDirection="column"
            p={3}
            bg={useColorModeValue("brand.50", "brand.600")}
            w={{ base: "100%", md: "70%" }}
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
              color={useColorModeValue("brand.700", "brand.200")}
            >
              Hi! My name is {username}!
            </Box>

            <Box
              m={"auto"}
              p={3}
              bg={useColorModeValue("brand.50", "brand.600")}
              w="100%"
              h="100%"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text>I'm from {location}</Text>
              <Text>
                I was born {formatDistanceToNow(new Date(birthday))} ago
              </Text>
              <Text>About me: {bio}</Text>
            </Box>
            <Box
              m={"auto"}
              p={3}
              bg={useColorModeValue("brand.50", "brand.600")}
              w="100%"
              h="100%"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text>My gender is: {gender}</Text>
              <Text>My breed is: {breed}</Text>
              <Text>My size is: {size}</Text>
            </Box>
            <HStack
              m={"auto"}
              p={3}
              bg={useColorModeValue("brand.50", "brand.600")}
              w="100%"
              h="100%"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Tag
                size={{ base: "md", md: "lg" }}
                py={2}
                px={4}
                colorScheme={"brand"}
              >
                {isNeuteredOrSpayed
                  ? "I'm neutered/spayed"
                  : "I'm not neutered/spayed"}
              </Tag>
              <Tag
                size={{ base: "md", md: "lg" }}
                py={2}
                px={4}
                colorScheme={"brand"}
              >
                {isVaccinated ? "I'm vaccinated" : "I'm not vaccinated"}
              </Tag>
              <Tag
                size={{ base: "md", md: "lg" }}
                py={2}
                px={4}
                colorScheme={"brand"}
              >
                {isTrained ? "I'm trained" : "I'm not trained"}
              </Tag>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default WoofrProfile;
