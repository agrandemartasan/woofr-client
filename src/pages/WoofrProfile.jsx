import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import Nav from "../components/Nav";

function WoofrProfile() {
  const { loggedUser } = useContext(UserContext);

  return (
    <>
      <Nav />
      <div>Your Profile</div>
    </>
  );
}

export default WoofrProfile;
