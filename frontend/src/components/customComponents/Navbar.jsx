import { Box, Button, Container, Flex, HStack, Text, useBreakpointValue, } from "@chakra-ui/react";
import { TbUserPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUserStore } from "../../store/user";


const NavBar = () => {
    const userStore = useUserStore();
    const isAuthenticated = userStore.isAuthenticated;
    const token = localStorage.getItem('token');
  const handleLogout = ()=>{
    userStore.logout();
  }
  const gradientFromMobile ="purple.800";
  const gradientToMobile = "black";

  const gradientFromDesktop = "blue.800";
  const gradientToDesktop = "cyan.600";

  return (
    <Container fluid px={0} bgGradient="to-r"
    gradientFrom={useBreakpointValue({
      base: gradientFromMobile, // Mobile gradient start color
      sm: gradientFromDesktop, // Desktop gradient start color
    })}
    gradientTo={useBreakpointValue({
      base: gradientToMobile, // Mobile gradient end color
      sm: gradientToDesktop, // Desktop gradient end color
    })}>
        <Box px={4} bg="rgba(0, 0, 0, 0.5)">
        <Flex py={2} alignItems={"center"} flexDirection={{base:"column", sm:"row"}} justifyContent={"space-between"}>
            <Text
             fontSize={{base:22, sm:28}} fontWeight={"bold"}
             textAlign={"center"} bgGradient="to-r"
             gradientFrom="teal.400" gradientTo="blue.500"
             bgClip={"text"} py={2}>
                <Link to={"/"}>Contact Mate</Link>
            </Text>
            <HStack>
                {!isAuthenticated || !token?
                <Link to={"/login"}>
                    <Button><FaUserCircle /></Button>
                </Link> : <span><Link to={"/create"}> <Button><TbUserPlus/></Button> </Link>
                    <Link to={"/account"}><Button><FaUserCircle /></Button></Link>
                    <Link to={"/"} onClick={handleLogout}><Text as="span" px={2} color='white'>Logout</Text></Link>
                    </span>}
            </HStack>
        </Flex>
        </Box>
    </Container>
  )
};

export default NavBar;