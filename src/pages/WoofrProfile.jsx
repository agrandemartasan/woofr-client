import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import NavBar from "../components/NavBar";

function WoofrProfile() {
  const { loggedUser } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <div>Your Profile</div>
    </>
  );
}

export default WoofrProfile;
