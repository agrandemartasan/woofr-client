import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getAllUsers } from "../api";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

function FindFriends() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function hangleGetAllUsers() {
      const response = await getAllUsers();
      setAllUsers(response.data);
    }
    hangleGetAllUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Search For Friends</h1>
      <ul>
        {allUsers.map((user) => {
          return (
            <Center py={6}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "540px" }}
                height={{ sm: "476px", md: "20rem" }}
                direction={{ base: "column", md: "row" }}
                bg={"white"}
                boxShadow={"2xl"}
                padding={4}
              >
                <Flex flex={1} bg="blue.200">
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={
                      "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    }
                  />
                </Flex>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  pt={2}
                >
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {user.username}
                  </Heading>
                  <Text fontWeight={600} color={"gray"} size="sm" mb={4}>
                    {user.info.location}
                  </Text>
                  <Text textAlign={"center"} color={"gray"} px={3}>
                    {user.bio}
                  </Text>

                  <Stack
                    width={"100%"}
                    mt={"2rem"}
                    direction={"row"}
                    padding={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
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
                      Add As Friend
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Center>
          );
        })}
      </ul>
    </div>
  );
}

export default FindFriends;
