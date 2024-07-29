import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemListCard from "../components/ItemListCard"; 
import styles from "../styles/SearchResultsPage.module.css"; 


const SearchResultsPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${
          import.meta.env.VITE_API_URL
        }/api/items/search?query=${encodeURIComponent(searchTerm)}`;
        console.log(`Fetching data from URL: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.length > 0 ? (
            data.map((item) => <li key={item._id}>{item.itemname}</li>)
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsPage;
