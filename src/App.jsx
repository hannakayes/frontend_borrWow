import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDash from "./pages/UserDash";
import CreateNewItemPage from "./pages/CreateNewItemPage";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import BRequestsBYUserPage from "./pages/BRequestsBYUserPage";
import FavoritesPage from "./pages/FavoritesPage"; // Import your FavoritesPage component
import ErrorPage from "./pages/404ErrorPage"; // Import the ErrorPage component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreateBRequestPage from "./pages/CreateNewBRequestPage"; // Ensure this import is correct

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/userdash"
            element={
              <PrivateRoute>
                <UserDash />
              </PrivateRoute>
            }
          />
          <Route
            path="/newitem"
            element={
              <PrivateRoute>
                <CreateNewItemPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditBorrWow />
              </PrivateRoute>
            }
          />
          <Route
            path="/requestedByYOU"
            element={
              <PrivateRoute>
                <BRequestsBYUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/borrWow/:id"
            element={
              <PrivateRoute>
                <CreateBRequestPage />
              </PrivateRoute>
            }
          />
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
