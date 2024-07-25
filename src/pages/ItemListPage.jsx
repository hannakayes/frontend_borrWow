import { useEffect, useState } from "react";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/ItemListPage.module.css";
import headerImage from "../assets/images/header.png"; // Import your header image

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
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
        setFilteredItems(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

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
