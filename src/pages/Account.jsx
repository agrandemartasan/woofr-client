import NavBar from "../components/NavBar";
import InviteList from "../components/Account/InviteList";
import EditProfile from "../components/Account/EditProfile";
import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { Link } from "react-router-dom";
import { getUser } from "../api";

function Account() {
  const { loggedUser } = useContext(UserContext);
  const [userId, setUserId] = useState();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(loggedUser._id);
      setUserId(response.data._id);
      setProfilePicture(response.data.profilePicture);
    }

    if (loggedUser) {
      handleGetUserDetails();
    }
  }, [loggedUser]);
  return (
    <>
      <Flex
        alignItems="flex-start"
        flexDirection={{ base: "column", md: "row" }}
        w="100%"
        minH="92vh"
        gap={3}
        py={5}
        px={5}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <Box d="flex" flexDir={"column"} w={{ base: "100%", md: "30%" }}>
          <Box borderRadius="lg" mb={2}>
            <Image
              src={profilePicture}
              alt="profile picture"
              borderRadius="lg"
            />
          </Box>
          <Link to={`/profile/${userId}`}>
            <Box
              fontWeight={"bold"}
              fontSize="lg"
              p={3}
              pl={7}
              mb={2}
              bg={useColorModeValue("brand.50", "brand.600")}
              color={useColorModeValue("brand.900", "brand.50")}
              w="100%"
              h="100%"
              borderRadius="lg"
            >
              Click here to view your Woofr profile
            </Box>
          </Link>
          <InviteList />
        </Box>

        <EditProfile />
      </Flex>
    </>
  );
}

export default Account;
