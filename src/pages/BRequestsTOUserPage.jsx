import React, { UseContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ItemListCard.module.css";
import { SessionContext } from "../contexts/SessionContext";
const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
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
