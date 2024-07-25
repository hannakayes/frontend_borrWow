import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import styles from "../styles/ItemDetailsPage.module.css";
import modalStyles from "../styles/Modal.module.css"; // Import the new CSS module
import { SessionContext } from "../contexts/SessionContext";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useContext(SessionContext);

  const [dateRange, setDateRange] = useState([null, null]);

  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);

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
        pickupDate: dateRange[0],
        returnDate: dateRange[1],
        pickupLocation,
        returnLocation,
      };

      console.log("Values being sent:", values);

      const bodyData = JSON.stringify({
        ...values,
        item: id,
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
      setModalOpened(false); // Close modal after successful request
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
    const previousPage = localStorage.getItem("previousPage") || "/";
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
              onClick={() => setModalOpened(true)}
            >
              Request to BorrWow
            </Button>
            <Button
              variant="outline"
              color="#224eff"
              className={styles.button}
              onClick={() => navigate(`/items`)}
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

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Request to BorrWow"
        classNames={{ modal: modalStyles.modalContent }}
      >
        <DatePicker
          type="range"
          allowSingleDateInRange
          label="Select Date Range"
          value={dateRange}
          onChange={setDateRange}
        />

        <TextInput
          label="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.currentTarget.value)}
          classNames={{ input: modalStyles.textInput }}
        />
        <TextInput
          label="Return Location"
          value={returnLocation}
          onChange={(e) => setReturnLocation(e.currentTarget.value)}
          classNames={{ input: modalStyles.textInput }}
        />
        <Button onClick={handleRequest} fullWidth mt="md">
          Submit Request
        </Button>
      </Modal>
    </div>
  );
};

export default ItemDetailsPage;
