import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

function EmptyChatMessages() {
  return (
    <Box
      d={{ base: "flex", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={useColorModeValue("brand.50", "brand.600")}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex alignItems="center" justifyContent="center" h="100%">
        <Text
          color={useColorModeValue("brand.700", "brand.300")}
          fontSize="3xl"
          pb={3}
        >
          Click on one of your friends to chat
        </Text>
      </Flex>
    </Box>
  );
}

export default EmptyChatMessages;
