import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import styles from "../styles/ItemListCard.module.css";
const ItemListCard = ({ item }) => {
  const {
    itemname,
    description,
    category,
    location,
    availability,
    _id,
    image,
  } = item;
  // Truncate description to 80 characters
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
  // Determine the appropriate status class
  const statusClass = `${styles.status} ${styles[availability]}`;
  return (
    <div className={styles.card}>
      <div
        className={`${styles.categoryLabel} ${styles[category.toLowerCase()]}`}
      >
        {category}
      </div>
      <img src={image} alt={itemname} className={styles.image} />
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
            variant="filled"
            color="#224EFF"
            size="xs"
            className={styles.button}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ItemListCard;
