import { useContext, useEffect, useState } from "react";
import { acceptInvite, getInvitesReceived, rejectInvite } from "../api";
import { UserContext } from "../context/user.context";
import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";

function InviteList() {
  const { loggedUser } = useContext(UserContext);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    async function fetchInvites() {
      const response = await getInvitesReceived(loggedUser._id);
      setInvites(response.data);
    }
    if (loggedUser) fetchInvites();
  }, [loggedUser]);

  async function handleAcceptInvite(inviteId) {
    try {
      await acceptInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRejectInvite(inviteId) {
    try {
      await rejectInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      d="flex"
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
        pb={1}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={useColorModeValue("brand.700", "brand.200")}
      >
        Invites
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg={useColorModeValue("brand.50", "brand.600")}
        color={useColorModeValue("brand.50", "brand.900")}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {invites.length > 0 ? (
          invites.map((invite) => (
            <Box
              bg="brand.400"
              px={3}
              py={2}
              borderRadius="lg"
              key={invite._id}
            >
              <Text fontSize="lg" pb={2}>
                {invite.sender.username} wants to be your friend!
              </Text>
              <Button
                colorScheme={"brand"}
                mr={2}
                onClick={() => handleAcceptInvite(invite._id)}
              >
                Accept
              </Button>
              <Button
                colorScheme={"brand"}
                onClick={() => handleRejectInvite(invite._id)}
              >
                Reject
              </Button>
            </Box>
          ))
        ) : (
          <Box
            bg="brand.400"
            p={3}
            borderRadius="lg"
            fontSize={{ base: "sm", md: "md" }}
          >
            No invites yet.
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default InviteList;
