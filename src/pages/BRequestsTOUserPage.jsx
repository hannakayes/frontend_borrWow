import { useEffect, useState, useContext } from "react";
import BRequestCard from "../components/BRequestCard";
import styles from "../styles/ItemListPage.module.css";
import { SessionContext } from "../contexts/SessionContext";

const BRequestsTOUserPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(SessionContext);

  useEffect(() => {
    const fetchTORequests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/borrowrequests/incomingrequest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTORequests();
  }, [token]);

  if (error) return <p>Error: {error}</p>;
  if (!requests.length) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <h1>Incoming Requests</h1>
      <div className={styles.container}>
        {requests.map((request) => (
          <BRequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default BRequestsTOUserPage;
