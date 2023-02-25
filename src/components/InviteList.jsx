import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { getInvites, acceptInvite, rejectInvite } from "./api";

function InviteList() {
  const { loggedUser } = useContext(UserContext);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const inviteList = await getInvites(loggedUser);
      setInvites(inviteList);
    };

    fetchInvites();
  }, [loggedUser]);

  async function handleAcceptInvite(inviteId) {
    try {
      await acceptInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRejectInvite(inviteId) {
    try {
      await rejectInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Invites</h2>
      <ul>
        {invites.map((invite) => (
          <li key={invite._id}>
            {invite.fromUser.name} wants to be your friend!
            <button onClick={() => handleAcceptInvite(invite._id)}>
              Accept
            </button>
            <button onClick={() => handleRejectInvite(invite._id)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InviteList;
