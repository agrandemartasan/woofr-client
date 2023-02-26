import { UserContext } from "../context/user.context";
import { useContext } from "react";
import NavBar from "../components/NavBar";
import Nav from "../components/Nav";

function Homepage() {
  const { loggedUser } = useContext(UserContext);
  return (
    <div style={{ width: "100%" }}>
      <Nav />
      This is the homepage
    </div>
  );
}

export default Homepage;
