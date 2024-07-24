import React from "react";
import { Link } from "react-router-dom";
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
    description.length > 80
      ? `${description.substring(0, 80)}...`
      : description;

  return (
    <div className={styles.card}>
      <div
        className={`${styles.categoryLabel} ${styles[category.toLowerCase()]}`}
      >
        {category}
      </div>
      <img src={image} alt={itemname} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.itemName}>{itemname}</h2>
        <p className={styles.description}>{truncatedDescription}</p>
        <p className={styles.location}>Location: {location}</p>
        <p className={styles.status}>{availability}</p>
        <Link to={`/items/${_id}`} className={styles.detailsLink}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemListCard;
