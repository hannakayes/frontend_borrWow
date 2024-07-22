import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer component
import UserDash from "./pages/UserDash";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userdash" element={<UserDash />} />
          {/*           <Route
            path="/userdash"
            element={
              <PrivateRoute>
                <UserDash />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </main>
      <Footer /> {/* Add Footer component */}
    </>
  );
}

export default App;
