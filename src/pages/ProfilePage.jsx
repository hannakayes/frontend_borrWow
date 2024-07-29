import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function ProfilePage() {
  const { userId } = useContext(SessionContext);
  return (
    <>
      <h1> Hello {userId}</h1>
    </>
  );
}

export default ProfilePage;
