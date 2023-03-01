import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import Nav from "../components/Nav";
import { Link } from "@chakra-ui/react";

function WoofrProfile() {
  const { loggedUser } = useContext(UserContext);

  return (
    <>
      <Nav />
      <div>Your Profile</div>
      <Link href={"/edit"}>Edit your Profile</Link>
    </>
  );
}

export default WoofrProfile;
