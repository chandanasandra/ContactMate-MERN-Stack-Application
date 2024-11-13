import {
  Container,
  Text,
  VStack,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import { useEffect } from "react";
import { useContactStore } from "../store/contact";
import ContactCard from "../components/customComponents/ContactCard";
import { RiContactsBook3Fill } from "react-icons/ri";

const Account = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;
  const { fetchContacts, contact } = useContactStore();
  const gradientFrom = "blue.900";
  const gradientTo = "cyan.700";
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
    }
    fetchContacts();
  }, [isAuthenticated, navigate, fetchContacts, token]);
  console.log(isAuthenticated);
  return (isAuthenticated ? 
    <Container maxW="container.xl" py={12} bgSize="cover" bgImage={'url(https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?t=st=1731298759~exp=1731302359~hmac=4b7e8d3df499df33a4469ae4d07e045a87c91f1d5273134f4d84852d14fe9d3f&w=996)'}>
    <VStack spacing={8}>
      <Text>Hi {userStore.user.userName ? userStore.user.userName : 'Session Expired Please login again'}</Text>
      <HStack>
        <RiContactsBook3Fill size={30}/>
        <Text
          fontSize={30}
          fontWeight="bold"
          bgGradient="to-r"
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          bgClip="text"
        >{userStore.user.userName ?
          'Current Contacts' : ''}
        </Text>
      </HStack>
      {contact.length ==0 && (
        <Text textAlign={"center"} fontWeight={"bold"} bgGradient="to-r"
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}  bgClip="text">
          No Contacts Found!
          <Link to='/create'>
            <Text _hover={{textDecoration: "underline"}}> Create a contact</Text>
          </Link>
        </Text>
      )}
      <Grid p={2} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "repeat(4, 1fr)"}} gap={4} >
        {Array.isArray(contact) &&
          contact.map((cont) => <ContactCard key={cont._id} contact={cont} />)}
      </Grid>
    </VStack>
  </Container> : <div><Text>Your session has expired. Please login again</Text></div>
  );
};

export default Account;
