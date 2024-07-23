import { useEffect, useState } from "react";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/ItemListPage.module.css";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {items.map((item) => (
          <ItemListCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListPage;
