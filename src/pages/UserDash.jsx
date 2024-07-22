import React, { useState } from "react";
import { SimpleGrid, Container, Title, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "../styles/UserDash.module.css"; // Import CSS module

function UserDash() {
  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        {/* Image above the title */}

        <div>
          <Title align="center">Your User Dashboard</Title>
          <Text align="center" mt="md">
            Here there'll be links to all different things you can do on our
            page
          </Text>
          <div
            style={{
              resize: "horizontal",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            <SimpleGrid
              type="container"
              cols={{ base: 1, "300px": 2, "500px": 5 }}
              spacing={{ base: 10, "300px": "xl" }}
            >
              <Link to="/list-new-thing" className={styles.link}>
                <div className={styles.activity}>Create new borrWow</div>
              </Link>
              <Link to="/manage-things" className={styles.link}>
                <div className={styles.activity}>Manage your borrWows</div>
              </Link>
              <Link to="/activity-history" className={styles.link}>
                <div className={styles.activity}>Activity History</div>
              </Link>
              <Link to="/edit-profile" className={styles.link}>
                <div className={styles.activity}>Edit Profile</div>
              </Link>
              <Link to="/logout" className={styles.link}>
                <div className={styles.activity}>Logout</div>
              </Link>
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
