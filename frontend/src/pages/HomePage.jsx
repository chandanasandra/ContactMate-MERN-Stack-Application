import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <Box h="100vh" bgSize="cover" bgImage={{base: "url(https://images.unsplash.com/photo-1571079570759-8b8800f7c412?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",sm:"url(https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"}}>
    <Box p={9} bg="rgba(0, 0, 0, 0.5)" h="100vh">
        <VStack gap={2} p={4} align="flex-start">
          <Heading size="5xl" color="teal.500" m={1}>
            Manage Contacts Easily
          </Heading>
          <Text color="white" p={2}>
          For every minute spent organizing, an hour is earned.
          </Text>
          <Button colorPalette="teal" p={4}>
            <Link to={"/register"}>Get Started</Link>
          </Button>
        </VStack>
    </Box>
    </Box>
  );
};

export default HomePage;
