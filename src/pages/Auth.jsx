import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import DogHero from "../assets/1.jpg";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

function Auth() {
  return (
    <Flex
      w={"full"}
      minH={"fit-content"}
      backgroundImage={DogHero}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="brand.100"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" color="black" textAlign="center">
            Woofr
          </Text>
        </Box>
        <Box bg="brand.200" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded" colorScheme="brand">
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
    </Flex>
  );
}

export default Auth;
