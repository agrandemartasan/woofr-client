import { UserContext } from "../context/user.context";
import { useContext } from "react";
import NavBar from "../components/NavBar";

function Homepage() {
  const { loggedUser } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      This is the homepage
    </div>
  );
}

export default Homepage;
