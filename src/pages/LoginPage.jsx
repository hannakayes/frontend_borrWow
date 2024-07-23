import React, { useState, useContext } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(SessionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // Check if the user exists
      const userResponse = await fetch(
        `http://localhost:5005/api/users?username=${encodeURIComponent(email)}`
      );

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user information.");
      }

      const userData = await userResponse.json();

      if (userData.length === 0) {
        // If the user does not exist, throw an error
        throw new Error("User does not exist.");
      }

      // Proceed with login if user exists
      const loginResponse = await fetch("http://localhost:5005/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await loginResponse.json();
      console.log("Login successful:", data);

      // Store token and update context
      localStorage.setItem("authToken", data.token);
      setToken(data.token); // Update context token

      // Delay navigation to ensure context updates
      setTimeout(() => {
        navigate("/userdash");
      }, 100);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            color="#224eff"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
