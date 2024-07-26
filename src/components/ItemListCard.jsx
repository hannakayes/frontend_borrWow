import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import styles from "../styles/ItemListCard.module.css";

const ItemListCard = ({ item, onFavoriteChange }) => {
  const {
    itemname,
    description,
    category,
    location,
    availability,
    _id,
    imageUrl,
  } = item;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage to determine if item is already a favorite
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(_id));

    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set login state based on presence of token
  }, [_id]);

  // Truncate description to 140 characters
  const truncatedDescription =
    description.length > 140
      ? `${description.substring(0, 140)}...`
      : description;

  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  // Handle button click to navigate to item details
  const handleViewDetails = () => {
    navigate(`/items/${_id}`);
  };

  // Handle favorite button click
  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== _id)
      : [...favorites, _id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    // Notify parent component about the favorite change
    if (onFavoriteChange) {
      onFavoriteChange(newFavorites);
    }
  };

  // Format category to match CSS class names
  const formatCategory = (category) => {
    return category
      .toLowerCase()
      .replace(/ & /g, "-and-")
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, ""); // Remove any non-alphanumeric characters except dashes
  };

  const formattedCategory = formatCategory(category);

  // Determine the appropriate status class
  const statusClass = `${styles.status} ${styles[availability]}`;

  return (
    <div className={styles.card}>
      {isLoggedIn && (
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
        >
          ♥
        </button>
      )}
      <div className={`${styles.categoryLabel} ${styles[formattedCategory]}`}>
        {category}
      </div>
      <img src={imageUrl} alt={itemname} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.itemNameContainer}>
          <h2 className={styles.itemName}>{itemname}</h2>
          <p className={statusClass}>{availability}</p>
        </div>
        <p className={styles.description}>{truncatedDescription}</p>
        <p className={styles.location}>Location: {location}</p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleViewDetails}
            variant="outline"
            color="#224EFF"
            size="xs"
            className={styles.button}
          >
            borrWow!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemListCard;
