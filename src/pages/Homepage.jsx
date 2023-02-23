import { UserContext } from "../context/user.context";
import { useContext } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NavBar from "../components/NavBar";

function Homepage() {
  const { loggedUser } = useContext(UserContext);
  return (
    <>
      {loggedUser ? (
        <NavBar />
      ) : (
        <Container maxW="xl" centerContent>
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text
              fontSize="4xl"
              fontFamily="lato"
              color="black"
              textAlign="center"
            >
              Woofr
            </Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs variant="soft-rounded">
              <TabList mb="1em">
                <Tab w="50%">Login</Tab>
                <Tab w="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Homepage;