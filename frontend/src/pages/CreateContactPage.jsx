import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useContactStore } from "../store/contact";
import { Toaster, toaster } from "../components/ui/toaster"
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import { useEffect } from "react";

const CreateContactPage = () => {
  const [newContact, setNewContact] = useState({
    name: "",
    email:"",
    phone: ""
  });
  const {createContact} = useContactStore();
  const userStore = useUserStore();
  // Move useColorModeValue calls to the top level
  const gradientFrom = "blue.800";
  const gradientTo = "purple.800";
  const isAuthenticated = userStore.isAuthenticated;
  const navigate = useNavigate();
  // Use useEffect to handle redirection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      localStorage.setItem('token','');
    }
  }, [isAuthenticated, navigate]);
  const handleNewContact = async () => {
    const result = await createContact(newContact);
    const success = result && result.success ? result.success: false;
    const message = result && result.message ? result.message: 'Contact couldnt be created. Try again later'
    if(!success) {
      toaster.create({
        title: 'Error',
        description: message,
        type: "error",
        isClosable: true
      });
      setNewContact({ ...newContact, authorized: false });
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        type: "success"
      })
    }
  // Reset fields after attempting to create the contact
  setNewContact({
    name: '',
    email: '',
    phone: ''
  });
  }
  return (
      <Container maxW={"container.sm"} h="100vh" bgSize="cover" p={0} bgImage={'url(https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?t=st=1731298759~exp=1731302359~hmac=4b7e8d3df499df33a4469ae4d07e045a87c91f1d5273134f4d84852d14fe9d3f&w=996)'}>
        <Box bg="rgba(0, 0, 0, 0.5)" h="100vh">
        <Toaster />
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} p={2} bgClip={'text'} bgGradient="to-r"
          gradientFrom={'cyan.400'}
          gradientTo={'blue.300'}
          fontWeight="bold"> Create new Contact</Heading>
          <Box w={"60%"} bgGradient="to-r" gradientFrom={gradientFrom} gradientTo={gradientTo} rounded="lg" p={8}>
            <VStack spacing={6}>
              <Input mb={3}
              placeholder="Enter the contact name..."
              name= "Name"
              value={newContact.name}
              onChange={(e)=>setNewContact({...newContact, name:e.target.value})}
              _hover={{ borderColor: "gray.400" }}
              _focus={{borderColor: "gray.400"}}
              _placeholder={{ color: "gray.200" }}
              color="white"
              />
              <Input mb={3}
              placeholder="Enter the email..."
              value={newContact.email}
              onChange={(e)=>setNewContact({...newContact, email:e.target.value})}
              _hover={{ borderColor: "gray.400" }}
              _focus={{borderColor: "gray.400"}}
              _placeholder={{ color: "gray.200" }}
              color="white"/>
              <Input mb={3}
              placeholder="Enter the phone number..."
              value={newContact.phone}
              onChange={(e)=>setNewContact({...newContact, phone: e.target.value})}
              _hover={{ borderColor: "gray.400" }}
              _focus={{borderColor: "gray.400"}}
              _placeholder={{ color: "gray.200" }}
              color="white"/>
              <Button colorPalette="teal" onClick={handleNewContact} w="full">Add Contact</Button>
            </VStack>
          </Box>
        </VStack>
        </Box>
      </Container>
  );
};

export default CreateContactPage;
