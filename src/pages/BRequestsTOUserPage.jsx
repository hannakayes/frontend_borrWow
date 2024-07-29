import { useEffect, useState, useContext } from "react";
import BRequestCard from "../components/BRequestCard";
import styles from "../styles/ItemListPage.module.css";
import { SessionContext } from "../contexts/SessionContext";

const BRequestsTOUserPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(SessionContext);

  useEffect(() => {
    const fetchBYRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/api/borrowrequests/incomingrequest",
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

    fetchBYRequests();
  }, [token]);

  if (error) return <p>Error: {error}</p>;
  if (!requests.length) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {requests.map((request) => (
          <BRequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default BRequestsTOUserPage;
