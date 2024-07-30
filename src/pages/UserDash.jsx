import React, { useState, useEffect, useContext } from "react";
import {
  SimpleGrid,
  Container,
  Title,
  Text,
  Center,
  Button,
  Indicator,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "../styles/UserDash.module.css"; // Import CSS module
import { SessionContext } from "../contexts/SessionContext";

function UserDash() {
  const { userId, token } = useContext(SessionContext);
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    const fetchUnseenCount = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/borrowrequests/unseen-count/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unseen count");
        }
        const data = await response.json();
        setUnseenCount(data.unseenCount);
      } catch (error) {
        console.error("Error fetching unseen count:", error);
      }
    };

    fetchUnseenCount();
  }, [userId, token]);

  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        <div>
          <Title align="center">Your User Dashboard</Title>
          <Text align="center" mt="md" className={styles.textWithSpacing}>
            Access all your activities and manage your borrWow interactions.
          </Text>
          <div className={styles.gridContainer}>
            <SimpleGrid
              type="container"
              cols={{ base: 1, "300px": 2, "500px": 5 }}
              spacing={{ base: 10, "300px": "xl" }}
            >
              <Button
                component={Link}
                to="/newitem"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Create new borrWow
              </Button>
              <Button
                component={Link}
                to="/user-borrwows"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Your BorrWows
              </Button>
              <Button
                component={Link}
                to="/profile"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Your Profile Page
              </Button>

              <Indicator inline label={unseenCount} size={16}>
                <Button
                  component={Link}
                  to="/incomingrequests"
                  variant="outline"
                  color="#224eff"
                  className={styles.button}
                >
                  Incoming requests
                </Button>
              </Indicator>

              <Button
                component={Link}
                to="/requestedByYOU"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Your requests
              </Button>
            </SimpleGrid>
          </div>
          <Center mt="lg">
            <Link to="/login" className={styles.loginLink}></Link>
          </Center>
        </div>
      </Center>
    </Container>
  );
}

export default UserDash;
