import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query') || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5005/api/items/search?query=${encodeURIComponent(searchTerm)}`;
        console.log(`Fetching data from URL: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching search results: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.length > 0 ? (
            data.map((item) => (
              <li key={item._id}>{item.itemname}</li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsPage;
