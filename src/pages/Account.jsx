import Nav from "../components/Nav";
import InviteList from "../components/InviteList";
import EditProfile from "../components/EditProfile";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { Link } from "react-router-dom";
import { getUser } from "../api";

function Account() {
  const { loggedUser } = useContext(UserContext);
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(loggedUser._id);
      setUserId(response.data._id);
    }

    if (loggedUser) {
      handleGetUserDetails();
      console.log("loggedUser", loggedUser);
    }
  }, [loggedUser]);
  return (
    <>
      <Nav />

      <Flex
        alignItems="flex-start"
        gap={6}
        w="100%"
        minH="91vh"
        py={5}
        px={5}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <Link to={`/profile/${userId}`}>View Profile</Link>
        <InviteList />
        <EditProfile />
      </Flex>
    </>
  );
}

export default Account;
