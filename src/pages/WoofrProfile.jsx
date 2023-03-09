import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import {
  Box,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

function WoofrProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
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

    handleGetUserDetails(userId);
  }, [userId]);

  return (
    <>
      <Nav />
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="flex-start"
        justifyContent="center"
        w="100%"
        minH="91vh"
        gap={4}
        pt={7}
        px={5}
        bg={useColorModeValue("brand.100", "brand.850")}
      >
        <Box
          p={3}
          bg={useColorModeValue("brand.50", "brand.600")}
          w={{ base: "100%", md: "27%" }}
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
          w={{ base: "100%", md: "50%" }}
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
            <Text>{bio}</Text>
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
            <Text>
              I was born {formatDistanceToNow(new Date(birthday))} ago
            </Text>
            <Text>I'm {gender}</Text>
            <Text>I'm a {breed}</Text>
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
            <Tag size="lg" colorScheme={"brand"}>
              {isNeuteredOrSpayed
                ? "I'm neutered/spayed"
                : "I'm not neutered/spayed"}
            </Tag>
            <Tag size="lg" colorScheme={"brand"}>
              {isVaccinated ? "I'm vaccinated" : "I'm not vaccinated"}
            </Tag>
            <Tag size="lg" colorScheme={"brand"}>
              {isTrained ? "I'm trained" : "I'm not trained"}
            </Tag>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}

export default WoofrProfile;
