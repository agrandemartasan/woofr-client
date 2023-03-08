import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
import Logo from "../utils/paw.png";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loggedUser, logout } = useContext(UserContext);
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("brand.200", "brand.900")} px={5}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={7}>
          <Image
            boxSize="8%"
            objectFit="cover"
            src={Logo}
            alt="Woofr Logo"
            p={2}
          />
          <Link
            pt={5}
            rounded={"md"}
            href={"/find"}
            _hover={{
              bg: "brand.500"
            }}
          >
            Find Friends
          </Link>
          <Link
            pt={5}
            rounded={"md"}
            href={"/chat"}
            _hover={{
              bg: "brand.500"
            }}
          >
            Chat With Your Friends
          </Link>
        </Stack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {loggedUser && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={loggedUser.profilePicture} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={loggedUser.profilePicture} />
                  </Center>
                  <br />
                  <Center>
                    <p>{loggedUser.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as="a" href="/profile">
                    Account Details
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
