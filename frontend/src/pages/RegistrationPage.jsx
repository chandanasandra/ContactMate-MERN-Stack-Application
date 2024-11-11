import { useState } from 'react'
import { VStack, Box, Input, Button, Container } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useUserStore } from '../store/user';
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster"
const RegistrationPage = () => {
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const userStore = useUserStore();
  const handleRegistration = async () => {
    var resp;
    if(newUser.userName && newUser.email && newUser.password) {
      const data = {
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password
      };
      resp = await userStore.register(data);
    }
    //console.log(resp);
    newUser.password ='';
    if(resp && resp.success) {
      setNewUser({userName: '', email: '', password: ''});
      navigate("/login");
    } else {
      toaster.create({
        title: 'Error',
        description: 'Registration failed. Please check the credentials',
        type: "error",
        isClosable: true
      })
    }
  }
  return (
    <Container h="100vh" bgSize="cover" p={0} bgImage={'url(https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?t=st=1731298759~exp=1731302359~hmac=4b7e8d3df499df33a4469ae4d07e045a87c91f1d5273134f4d84852d14fe9d3f&w=996)'}>
      <Box bg="rgba(0, 0, 0, 0.5)" h="100vh">
    <VStack spacing={8}>
      <Toaster />
        <Box w={"40%"} boxShadow={"2xl"} mt={4} rounded="lg" p={8} bgColor={'white'}>
            <VStack spacing={6}>
            <FaRegCircleUser size={30} color='grey'/>
              <Input mb={3}
                placeholder="User name"
                name= "userName"
                value={newUser.userName}
                onChange={(e)=>setNewUser({...newUser, userName: e.target.value})}
                />
                <Input mb={3}
                placeholder="Email"
                name= "email"
                value={newUser.email}
                onChange={(e)=>setNewUser({...newUser, email: e.target.value})}
                />
                <Input mb={3}
                placeholder="Password"
                type='password'
                value={newUser.password}
                onChange={(e)=>setNewUser({...newUser, password: e.target.value})}/>
                <Button colorPalette="teal" w="full" onClick={handleRegistration}>Create Account</Button>
            </VStack>
        </Box>
    </VStack>
    </Box>
    </Container>
  )
}

export default RegistrationPage