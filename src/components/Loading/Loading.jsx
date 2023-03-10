import { Center } from "@chakra-ui/layout";
import Lottie from "lottie-react";
import dogAnimation from "./73716-purple-dog-walking.json";

function Loading() {
  return (
    <Center h="100vh" w="full">
      <Lottie animationData={dogAnimation} loop={true} />
    </Center>
  );
}

export default Loading;
