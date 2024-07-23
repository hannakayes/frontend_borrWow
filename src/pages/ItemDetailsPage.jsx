import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ItemDetailsPage.module.css";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>{item.itemname}</h2>
        <p>{item.description}</p>
        <p>Category: {item.category}</p>
        <p>Location: {item.location}</p>
        <p>Availability: {item.availability}</p>
        <p>Owner: {item.owner ? item.owner.username : "Unknown"}</p>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
