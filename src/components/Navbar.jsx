import React from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css"; // Import CSS module

// Import images
import handshakeBlue from "../assets/images/handshake_blue.png";
import handshakeBlack from "../assets/images/handshake_black.png";

function Navbar() {
  return (
    <div className={styles.navbar}>
      {/* Home button as an image */}
      <Link to="/" className={styles.navLink}>
        <img
          src={handshakeBlue} // Use imported image path
          alt="Home"
          className={styles.navImage}
          onMouseEnter={(e) => (e.currentTarget.src = handshakeBlack)}
          onMouseLeave={(e) => (e.currentTarget.src = handshakeBlue)}
        />
      </Link>
      {/* Log In button at the far right */}
      <Button
        component={Link}
        to="/login"
        variant="outline"
        className={styles.button}
      >
        Log In
      </Button>
    </div>
  );
}

export default Navbar;
