import React from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ItemListCard.module.css";

const BRequestCard = ({ request }) => {
  const navigate = useNavigate();

  // Extract properties from request
  const { item, borrower, owner, requestDate, location, status, _id } = request;

  // Handle button click to navigate to details
  const handleViewDetails = () => {
    navigate(`/borrowrequests/${_id}`);
  };

  // Determine the appropriate status class
  const statusClass = `${styles.status} ${styles[status] || ""}`;

  // Ensure item and location are strings and status is valid
  return (
    <div className={styles.card}>
      <div className={styles.categoryLabel}>{status}</div>

      <div className={styles.details}>
        <div className={styles.itemNameContainer}>
          <h2 className={styles.item}>
            {item ? item.itemname : "Unknown Item"}
          </h2>
          <p className={statusClass}>{status}</p>
        </div>
        <p className={styles.location}>
          Location: {location || "Unknown Location"}
        </p>
        <p className={styles.requestDate}>
          Request Date: {new Date(requestDate).toLocaleDateString()}
        </p>
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

export default BRequestCard;
