import React, { useState, useEffect, useContext } from "react";
import { Select, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "../styles/AddItemForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function EditBorrWow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(SessionContext);

  // State to hold the fetched item data
  const [itemData, setItemData] = useState(null);

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

  // Fetch the item data when component mounts
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get item info");
        }

        const data = await response.json();
        setItemData(data); // Update state with fetched data
        /*      form.setValues({
          itemname: data.itemname || "",
          description: data.description || "",
          category: data.category || "",
          availability: data.availability || "",
          termsOfService: data.termsOfService || false,
        }); */
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id, token, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:5005/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const data = await response.json();
      console.log("Item updated:", data);
      navigate("/userdash");
    } catch (error) {
      console.error("Error updating item:", error);
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
        placeholder={itemData ? itemData.itemname : "Loading..."}
        {...form.getInputProps("itemname")}
      />
      <TextInput
        withAsterisk
        label="Description"
        placeholder={itemData ? itemData.description : "Loading..."}
        {...form.getInputProps("description")}
      />

      <Select
        label="Category"
        withAsterisk
        placeholder={itemData ? itemData.category : "Loading..."}
        data={[
          { value: "electronics", label: "electronics" },
          { value: "beauty", label: "beauty" },
          { value: "music", label: "music" },
          { value: "clothes", label: "clothes" },
          { value: "rooms", label: "rooms" },
          { value: "outdoor area", label: "outdoor area" },
        ]}
        {...form.getInputProps("category")}
      />

      <Select
        label="Availability"
        withAsterisk
        placeholder={itemData ? itemData.availability : "Loading..."}
        data={[
          { value: "Available", label: "Available" },
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

export default EditBorrWow;
