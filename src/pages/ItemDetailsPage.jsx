import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mantine/core"; // Import Mantine Button
import styles from "../styles/ItemDetailsPage.module.css";
import { SessionContext } from "../contexts/SessionContext";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [item, setItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useContext(SessionContext);
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set login state based on presence of token

    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);

        // Check if the item is a favorite
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.includes(id));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);
  const handleRequest = async () => {
    console.log("Token:", token);

    try {
      if (!token) {
        throw new Error("No authentication token");
      }

      const values = {
        example: "data",
        // Add other necessary fields here
        location: item.location, // Assuming 'item' is defined and has 'location' property
      };

      console.log("Values being sent:", values);

      const bodyData = JSON.stringify({
        ...values,
        item: id, // Include the item ID in the request
      });

      console.log("Serialized body data:", bodyData);

      const response = await fetch("http://localhost:5005/api/borrowrequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: bodyData,
      });

      if (!response.ok) {
        throw new Error("Failed to create borrow request");
      }

      const data = await response.json();
      console.log("Borrow request created:", data);
      navigate("/requestedByYOU");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleReturnClick = () => {
    const previousPage = localStorage.getItem("previousPage") || "/"; // Default to home if no previous page
    navigate(previousPage);
  };

  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.details}>
          <div className={styles.categoryLabel}>{item.category}</div>
          <div className={styles.itemNameContainer}>
            <h2 className={styles.itemName}>{item.itemname}</h2>
            <p className={styles.status}>{item.availability}</p>
          </div>
          <p className={styles.location}>Location: {item.location}</p>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.owner}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <p>{item.owner ? item.owner.username : "Unknown"}</p>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              variant="filled"
              color="#224eff"
              className={styles.button}
              onClick={handleRequest} // Redirect to contact page
            >
              Request to BorrWow
            </Button>
            <Button
              variant="outline"
              color="#224eff"
              className={styles.button}
              onClick={() => navigate(`/items`)} // Use handleReturnClick for navigation
            >
              Return
            </Button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {isLoggedIn && (
            <button
              className={`${styles.favoriteBtn} ${
                isFavorite ? styles.active : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label="Toggle favorite"
            >
              ♥
            </button>
          )}
          <img src={item.image} alt={item.itemname} className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
