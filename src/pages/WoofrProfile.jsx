import { UserContext } from "../context/user.context";
import { useContext } from "react";
import NavBar from "../components/NavBar";
import { Button } from "@chakra-ui/react";

function WoofrProfile() {
  const { loggedUser, logout } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      {loggedUser ? (
        <div>
          <p>Welcome {loggedUser.username}</p>
          <Button
            colorScheme="red"
            w="100%"
            style={{ marginTop: 15 }}
            type="submit"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>You're not logged in yet</div>
      )}
    </div>
  );
}

export default WoofrProfile;
