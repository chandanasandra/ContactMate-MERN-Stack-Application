import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useContactStore } from "../store/contact";
import { useNavigate } from "react-router-dom";

const EditContactPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email, phone } = location.state || {};
  const contactStore = useContactStore();
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Set initial state with data from Link
    if (location.state) {
      setContact({
        id: id || "",
        name: name || "",
        email: email || "",
        phone: phone || "",
      });
    }
  }, [id, name, email, phone, location.state]);

  const handleContactUpdate = async () => {
    const payload={};
    if(name != contact.name) {
      payload.name = contact.name;
    }
    if(email != contact.email) {
      payload.email = contact.email;
    }
    if(phone != contact.phone) {
      payload.phone = contact.phone;
    }
    var resp = await contactStore.updateContact(payload, id);
    if(resp.success) {
      navigate('/account');
    } else {
      toaster.create({
        title: 'Error',
        description: 'Update contact failed. Try again later',
        type: "error",
        isClosable: true
      });
    }
  };
  return (
    <Container maxW={"container.sm"} h="100vh" bgSize="cover" p={0} bgImage={'url(https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?t=st=1731298759~exp=1731302359~hmac=4b7e8d3df499df33a4469ae4d07e045a87c91f1d5273134f4d84852d14fe9d3f&w=996)'}>
      <Box bg="rgba(0, 0, 0, 0.5)" h="100vh">
      <Toaster />
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} p={2} bgClip={'text'} bgGradient="to-r"
          gradientFrom={'cyan.500'}
          gradientTo={'blue.300'}
          fontWeight="bold">
          Update Contact
        </Heading>
        <Box w={"60%"} rounded="sm" p={8} shadow="lg" bgColor={'white'} opacity={0.8}>
          <VStack spacing={6}>
            <Input
              mb={3}
              placeholder={contact.name}
              name="Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
            <Input
              mb={3}
              placeholder={contact.email}
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
            <Input
              mb={3}
              placeholder={contact.phone}
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
            <Button colorPalette="teal" onClick={handleContactUpdate} w="full">
              Update
            </Button>
          </VStack>
        </Box>
      </VStack>
      </Box>
    </Container>
  );
};

EditContactPage.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
}
export default EditContactPage;
