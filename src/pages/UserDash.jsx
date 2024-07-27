import React from "react";
import {
  SimpleGrid,
  Container,
  Title,
  Text,
  Center,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "../styles/UserDash.module.css"; // Import CSS module

function UserDash() {
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
                to="/activity-history"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Activity History
              </Button>
              <Button
                component={Link}
                to="/incomingrequests"
                variant="outline"
                color="#224eff"
                className={styles.button}
              >
                Incoming requests
              </Button>
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
