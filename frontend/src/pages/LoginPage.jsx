import { Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useUserStore } from "../store/user";
import { Link, useNavigate } from "react-router-dom";
import { VStack, Box, Input, Button } from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Toaster, toaster } from "../components/ui/toaster"
const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    token: "",
  });
  const userStore = useUserStore();
  const navigate = useNavigate();
  const handleLogin = async () => {
    var resp;
    if(user.email && user.password) {
      resp = await userStore.login(user.email, user.password);
    }
    user.password = "";
    const token = localStorage.getItem('token');
    if (resp && resp.success && token) {
        setUser({ email: '', password: '', token: '' });
        var details = await userStore.getUserInfo(token);
        if (details.success) {
          navigate("/account");  // Redirect to account if login succeeds
        } else {
          toaster.create({
            title: 'Error',
            description: 'Login failed. Please check the credentials',
            type: "error",
            isClosable: true
          })
          localStorage.setItem('token', '');
          localStorage.setItem('userName', '');
          localStorage.setItem('email', '');
          userStore.token=null;
        }
    } else {
      toaster.create({
        title: 'Error',
        description: 'Login failed. Please check the credentials',
        type: "error",
        isClosable: true
      })
      localStorage.setItem('token', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('email', '');
    }
  };
  return (<Container h="100vh" bgSize="cover" p={0} bgImage={'url(https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?t=st=1731298759~exp=1731302359~hmac=4b7e8d3df499df33a4469ae4d07e045a87c91f1d5273134f4d84852d14fe9d3f&w=996)'}>
     <Toaster />
     <Box bg="rgba(0, 0, 0, 0.5)" h="100vh">
    <VStack spacing={8}>
        <Box w={"40%"} mt={4} bgGradient="to-r" gradientFrom={"blue.800"} gradientTo={"purple.600"} rounded="lg" p={8}>
            <VStack spacing={6}>
            <FaRegCircleUser color="white" size={40}/>
                <Input mb={3}
                placeholder="Email"
                name= "email"
                value={user.email}
                color="white"
                onChange={(e)=>setUser({...user, email:e.target.value})}
                _hover={{ borderColor: "gray.400" }}
                _focus={{borderColor: "gray.400"}}
                _placeholder={{ color: "gray.200" }}
                />
                <Input mb={3}
                placeholder="Password"
                type='password'
                value={user.password}
                onChange={(e)=>setUser({...user, password:e.target.value})}
                color="white"
                _hover={{ borderColor: "gray.400" }}
                _focus={{borderColor: "gray.400"}}
                _placeholder={{ color: "gray.200" }}/>
                <Button colorPalette="teal" onClick={handleLogin} w="full">Login</Button>
                <Text color="white" fontSize={"sm"}>Don't have an account? Click 
                  <Link to="/register"> <Text as={"span"} textDecoration={"underline"} colorPalette={"teal"}>here</Text></Link> to create one.</Text>
            </VStack>
        </Box>
    </VStack>
    </Box>
  </Container>);
};

export default LoginPage;
