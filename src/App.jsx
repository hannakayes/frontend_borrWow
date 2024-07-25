import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDash from "./pages/UserDash";
import CreateNewItemPage from "./pages/CreateNewItemPage";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import EditBorrWow from "./components/EditBorrWow";
import BRequestsBYUserPage from "./pages/BRequestsBYUserPage";
import FavoritesPage from "./pages/FavoritesPage"; // Import your FavoritesPage component
import ErrorPage from "./pages/404ErrorPage"; // Import the ErrorPage component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import EditItemPage from "./pages/EditItemPage";

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
                <EditItemPage />
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
