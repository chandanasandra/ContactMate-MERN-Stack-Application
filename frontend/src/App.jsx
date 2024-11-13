import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateContactPage from "./pages/CreateContactPage";
import NavBar from "./components/customComponents/Navbar";
import Account from "./pages/Account";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Footer from "./components/customComponents/Footer";
import EditContactPage from "./pages/EditContactPage";
import { useState } from "react";
import PageLoader from "./components/customComponents/PageLoader";
import { ClipLoader } from 'react-spinners';
function App() {
  const [loading, setLoading] = useState(false);
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <PageLoader setLoading={setLoading} />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <ClipLoader size={150} color="#123abc" speedMultiplier={1} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/edit" element={<EditContactPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
