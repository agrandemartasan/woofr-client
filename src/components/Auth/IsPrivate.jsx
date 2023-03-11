import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";
import Navbar from "../NavBar";

function IsPrivate({ children }) {
  const { loggedUser, isLoading } = useContext(UserContext);

  if (!loggedUser && !isLoading) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <Navbar /> {children}
      </>
    );
  }
}

export default IsPrivate;
