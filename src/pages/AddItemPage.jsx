import React from "react";
import { Select, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddItemForm.module.css";

function AddItemForm() {
  const navigate = useNavigate();

  // Initialize form with default values for adding a new item
  const form = useForm({
    initialValues: {
      itemname: "",
      description: "",
      category: "",
      availability: "",
      termsOfService: false,
    },
    validate: {
      itemname: (value) => (value ? null : "Item name is required"),
      description: (value) => (value ? null : "Description is required"),
      category: (value) => (value ? null : "Category is required"),
      availability: (value) => (value ? null : "Availability is required"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5005/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit item");
      }

      const data = await response.json();
      console.log("Item created:", data);
      navigate("/userdash");
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
        label="Item name"
        placeholder="What do you want to BorrWow out?"
        {...form.getInputProps("itemname")}
      />
      <TextInput
        withAsterisk
        label="Description"
        placeholder="How would you describe what you could BorrWow out?"
        {...form.getInputProps("description")}
      />

      <Select
        label="Category"
        withAsterisk
        placeholder="Select the category"
        data={[
          { value: "electronics", label: "Electronics" },
          { value: "beauty", label: "Beauty" },
          { value: "music", label: "Music" },
          { value: "tools", label: "Tools" },
          { value: "clothes", label: "Clothes" },
          { value: "rooms", label: "Rooms" },
          { value: "outdoor area", label: "Outdoor Area" },
        ]}
        {...form.getInputProps("category")}
      />

      <Select
        label="Availability"
        withAsterisk
        placeholder="Do you want people to see this BorrWow?"
        data={[
          { value: "Available", label: "Available" },
          { value: "Not Available", label: "Not Available" },
          { value: "Hidden", label: "Hidden" },
        ]}
        {...form.getInputProps("availability")}
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

export default AddItemForm;
