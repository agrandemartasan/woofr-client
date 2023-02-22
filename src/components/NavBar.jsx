import { Image, Flex, Button, HStack, chakra } from "@chakra-ui/react";
import Logo from "../utils/paw.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { useContext } from "react";

function NavBar() {
  const { loggedUser, logout } = useContext(UserContext);
  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        <Image src={Logo} h="50px" />

        <HStack as="nav" spacing="5">
          <Button>
            <NavLink to="/find">Find Friends</NavLink>
          </Button>
        </HStack>

        <HStack as="nav" spacing="5">
          <Button>
            <NavLink to="/profile">Profile</NavLink>
          </Button>
        </HStack>

        <HStack as="nav" spacing="5">
          {loggedUser ? (
            <div>
              <p>Welcome {loggedUser.username}</p>
              <Button
                colorScheme="red"
                w="100%"
                style={{ marginTop: 15 }}
                type="submit"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>You're not logged in yet</div>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
}

export default NavBar;
