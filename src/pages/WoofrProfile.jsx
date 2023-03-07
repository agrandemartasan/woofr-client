import Nav from "../components/Nav";
import { Link } from "@chakra-ui/react";
import InviteList from "../components/InviteList";

function WoofrProfile() {
  return (
    <>
      <Nav />
      <div>Your Profile</div>
      <Link href={"/edit"}>Edit your Profile</Link>
      <div>{<InviteList />}</div>
    </>
  );
}

export default WoofrProfile;
