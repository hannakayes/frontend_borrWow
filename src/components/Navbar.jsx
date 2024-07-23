import React, { useContext } from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import handshakeBlue from "../assets/images/handshake_blue.png";
import handshakeBlack from "../assets/images/handshake_black.png";
import { SessionContext } from "../contexts/SessionContext";

function Navbar() {
  const { isAuthenticated, handleLogout } = useContext(SessionContext);
  // if logged in remove login and signup and add dashboard & logout

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        <img
          src={handshakeBlue}
          alt="Home"
          className={styles.navImage}
          onMouseEnter={(e) => (e.currentTarget.src = handshakeBlack)}
          onMouseLeave={(e) => (e.currentTarget.src = handshakeBlue)}
        />
      </Link>
      <div className={styles.buttonContainer}>
        {!isAuthenticated ? (
          <>
            <Button
              component={Link}
              to="/login"
              variant="outline"
              className={styles.button}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="filled"
              className={styles.button}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/userdash"
              variant="outline"
              className={styles.button}
            >
              Dashboard
            </Button>
            <Button
              onClick={handleLogout}
              variant="filled"
              className={styles.button}
            >
              Log Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
