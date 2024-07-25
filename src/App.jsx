import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import UserDash from "./pages/UserDash";
import PrivateRoute from "./components/PrivateRoute";
import CreateNewItemPage from "./pages/CreateNewItemPage";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import AddItemPage from "./pages/AddItemPage";
import EditBorrWow from "./components/EditBorrWow";
import BRequestsBYUserPage from "./pages/BRequestsBYUserPage";
import CreateBRequestPage from "./pages/CreateNewBRequestPage";
import FavoritesPage from "./pages/FavoritesPage"; // Import your FavoritesPage component

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
                <AddItemPage />
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
