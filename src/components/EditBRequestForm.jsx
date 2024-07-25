import React, { useState, useEffect, useContext } from "react";
import {
  Select,
  Button,
  Checkbox,
  Group,
  TextInput,
  DatePicker,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import styles from "../styles/AddItemForm.module.css";

function EditBRequestForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(SessionContext);

  // State to hold the fetched borrow request data
  const [borrowRequestData, setBorrowRequestData] = useState(null);

  const form = useForm({
    initialValues: {
      pickupDate: "",
      returnDate: "",
      pickupLocation: "",
      returnLocation: "",
      termsOfService: false,
    },
    validate: {
      pickupDate: (value) => (value ? null : "Pickup date is required"),
      returnDate: (value) => (value ? null : "Return date is required"),
      pickupLocation: (value) => (value ? null : "Pickup location is required"),
      returnLocation: (value) => (value ? null : "Return location is required"),
    },
  });

  // Fetch the borrow request data when component mounts
  useEffect(() => {
    const fetchBorrowRequestData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/api/borrowrequests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get borrow request info");
        }

        const data = await response.json();
        setBorrowRequestData(data); // Update state with fetched data
        form.setValues({
          pickupDate: new Date(data.pickupDate),
          returnDate: new Date(data.returnDate),
          pickupLocation: data.pickupLocation,
          returnLocation: data.returnLocation,
          termsOfService: data.termsOfService || false,
        });
      } catch (error) {
        console.error("Error fetching borrow request data:", error);
      }
    };

    fetchBorrowRequestData();
  }, [id, token, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/borrowrequests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update borrow request");
      }

      const data = await response.json();
      console.log("Borrow request updated:", data);
      navigate("/requestedByYOU");
    } catch (error) {
      console.error("Error updating borrow request:", error);
    }
  };

  if (!borrowRequestData) return <div>Loading...</div>;

  return (
    <form
      className={styles.container}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <DatePicker
        type="range"
        label="Select Date Range"
        value={[form.values.pickupDate, form.values.returnDate]}
        onChange={(dates) => {
          if (dates && dates.length === 2) {
            form.setValues({
              ...form.values,
              pickupDate: dates[0],
              returnDate: dates[1],
            });
          }
        }}
        classNames={{ input: styles.datePicker }}
      />

      <TextInput
        withAsterisk
        label="Pickup Location"
        placeholder={
          borrowRequestData ? borrowRequestData.pickupLocation : "Loading..."
        }
        {...form.getInputProps("pickupLocation")}
      />

      <TextInput
        withAsterisk
        label="Return Location"
        placeholder={
          borrowRequestData ? borrowRequestData.returnLocation : "Loading..."
        }
        {...form.getInputProps("returnLocation")}
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

export default EditBRequestForm;
