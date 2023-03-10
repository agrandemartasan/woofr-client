import DogHero from "../../assets/3.jpg";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "brand.200",
                zIndex: -1
              }}
            >
              Woofr
            </Text>
            <br />{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"brand.600"}>
            Your dog deserves the best. That's why we created Woofr - to help
            you find the perfect match for your pup. Whether you're looking for
            a playmate, a running buddy, or a lifelong companion, our community
            of dog lovers is here to help. Sign up today and start your dog's
            love story!
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              as={RouterLink}
              to="/auth"
              bg={"brand.200"}
              rounded={"full"}
              color={"white"}
              _hover={{
                bg: "brand.300"
              }}
            >
              Get Started!
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        flex={1}
        backgroundImage={DogHero}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      ></Flex>
    </Stack>
  );
}

<Button
  as={RouterLink}
  to="/auth"
  bg={"brand.200"}
  rounded={"full"}
  color={"white"}
  _hover={{ bg: "brand.300" }}
>
  Get Started!
</Button>;
