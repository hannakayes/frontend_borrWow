import React from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "../styles/BRequestCard.module.css"; // Import the updated CSS module

const BRequestCard = ({ request }) => {
  const navigate = useNavigate();
  const {
    item,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
    status,
    _id,
  } = request;

  const handleViewDetails = () => {
    navigate(`/borrowrequests/${_id}`);
  };

  const handleEditRequest = () => {
    navigate(`/editBorrWow/${_id}`);
  };

  const statusClass = `${styles.status} ${styles[status] || ""}`;

  return (
    <div className={styles.card}>
      {item.image && (
        <img src={item.image} alt={item.itemname} className={styles.image} />
      )}
      <div className={statusClass}>{status}</div>
      <div className={styles.details}>
        <div className={styles.itemNameContainer}>
          <h2 className={styles.itemName}>
            {item ? item.itemname : "Unknown Item"}
          </h2>
        </div>
        <p>
          Pickup Location:{" "}
          <span className={styles.locationValue}>
            {pickupLocation || "Unknown Location"}
          </span>
        </p>
        <p>
          Return Location:{" "}
          <span className={styles.locationValue}>
            {returnLocation || "Unknown Location"}
          </span>
        </p>
        <p>
          Request Date Range:{" "}
          <span className={styles.requestDateValue}>
            {new Date(pickupDate).toLocaleDateString()} -{" "}
            {new Date(returnDate).toLocaleDateString()}
          </span>
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleViewDetails}
            variant="outline"
            color="#224EFF"
            size="xs"
            className={styles.button}
          >
            View Details
          </Button>
          <Button
            onClick={handleEditRequest}
            variant="outline"
            color="#224EFF"
            size="xs"
            className={styles.button}
          >
            Edit Borrow Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BRequestCard;
