import React from "react";
import CreateBRequest from "../components/CreateBRequestForm"; // Ensure this path is correct
import { Container, Title, Center } from "@mantine/core";
import styles from "../styles/CreateNewItemPage.module.css";

function CreateBRequestPage() {
  return (
    <>
      <Container className={styles.container}>
        <Center className={styles.center}>
          <Title align="center">Do you want to BorrWow this?</Title>
        </Center>
      </Container>
      <Container className={styles.formContainer}>
        <CreateBRequest />
      </Container>
    </>
  );
}

export default CreateBRequestPage;
