import React from "react";
import { Button } from "@mantine/core";
import styles from "../styles/BRequestCard.module.css"; // Import the updated CSS module

const BRequestCard = ({ request, onDelete, token }) => {
  const {
    item,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
    status,
    _id,
  } = request;

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      onDelete(_id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditRequest = () => {
    navigate(`/borrWow/${_id}`);
  };

  const statusClass = `${styles.status} ${styles[status] || ""}`;

  return (
    <div className={styles.card}>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.itemname} className={styles.image} />
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
            onClick={handleDeleteRequest}
            variant="outline"
            color="#224EFF"
            size="xs"
            className={styles.button}
          >
            Delete
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
