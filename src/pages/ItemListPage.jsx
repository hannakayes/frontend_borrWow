import React, { useEffect, useState, useContext } from "react";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/ItemListPage.module.css";
import headerImage from "../assets/images/header.png";
import { SessionContext } from "../contexts/SessionContext";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useContext(SessionContext); // Use session context to get user ID

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

        // Filter items based on availability and ownership
        const visibleItems = data.filter(
          (item) => item.availability === "Available" || (userId && item.owner && userId === item.owner._id.toString())
        );

        setItems(visibleItems);
        setFilteredItems(visibleItems);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(visibleItems.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, [userId]);

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <img src={headerImage} alt="Header" className={styles.headerImage} />
      <div className={styles.categoryLinks}>
        <button onClick={() => handleCategoryClick("All")}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className={styles.container}>
        {filteredItems.map((item) => (
          <ItemListCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListPage;
