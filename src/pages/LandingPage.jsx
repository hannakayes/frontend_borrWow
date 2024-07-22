import React from "react";
import { Container, Title, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import handshakeBlack from "../assets/images/handshake_black.png"; // Import the image
import styles from "../styles/LandingPage.module.css"; // Import CSS module

function LandingPage() {
  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        {/* Image above the title */}
        <img src={handshakeBlack} alt="Handshake" className={styles.logo} />
        <div>
          <Title align="center">Welcome to BorrWow!</Title>
          <Text align="center" mt="md">
            A local platform to share, help, and lend more than a hand. Join our
            community now!
          </Text>
          <Center mt="lg">
            <Link to="/login" className={styles.loginLink}></Link>
          </Center>
        </div>
      </Center>
    </Container>
  );
}

export default LandingPage;
