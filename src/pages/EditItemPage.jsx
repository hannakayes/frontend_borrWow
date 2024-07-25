import React from "react";
import { Container, Title } from "@mantine/core";
import EditBorrWow from "../components/EditBorrWow"; // Import your component

function EditItemPage() {
  return (
    <Container>
      <Title order={2} mb="md">
        Edit Item
      </Title>
      <EditBorrWow />
    </Container>
  );
}

export default EditItemPage;
