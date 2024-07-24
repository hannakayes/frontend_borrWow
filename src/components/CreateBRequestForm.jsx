import React, { useContext, useState } from "react";
import { Select, Button, TextInput, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import styles from "../styles/AddItemForm.module.css";

function CreateBRequest() {
  const { token, userId } = useContext(SessionContext); // Get userId from context
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the item ID is passed as a URL parameter

  const form = useForm({
    initialValues: {
      location: "",
      termsOfService: false,
    },
  });

  const handleSubmit = async (values) => {
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!userId) {
        throw new Error("No user ID found");
      }

      const response = await fetch("http://localhost:5005/api/borrowrequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          item: id, // Include the item ID in the request
          borrower: userId, // Use the userId from context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create borrow request");
      }

      const data = await response.json();
      console.log("Borrow request created:", data);
      navigate("/myrequests"); // Redirect to a page showing the user's requests
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <TextInput
        withAsterisk
        label="Location"
        placeholder="Where will you pick up the item?"
        {...form.getInputProps("location")}
      />

      <Select
        label="Category"
        placeholder="Select your location"
        data={locations} // Assuming locations are fetched or predefined
        {...form.getInputProps("location")}
      />

      <Checkbox
        mt="md"
        label="Agree to terms"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

export default CreateBRequest;
