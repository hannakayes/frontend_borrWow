import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Button, TextInput, Container, Image, Group } from "@mantine/core";

function ProfilePage() {
  const { userId, token } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
        setUsername(data.username || "");
        setImage(data.image || "");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, image }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      alert("Profile updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <Container>
      <Group direction="column" align="center">
        <Image
          src={user.image || "default-image-url"}
          alt={user.username}
          radius="md"
          width={120}
        />
        <h1>Hello, {user.username}</h1>
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <TextInput
          label="Profile Image URL"
          value={image}
          onChange={(e) => setImage(e.currentTarget.value)}
        />
        <Button onClick={handleUpdate}>Update Profile</Button>
      </Group>
    </Container>
  );
}

export default ProfilePage;
