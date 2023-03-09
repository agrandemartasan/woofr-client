import { useContext, useEffect, useState } from "react";
import { acceptInvite, getInvitesReceived, rejectInvite } from "../api";
import { UserContext } from "../context/user.context";

function InviteList() {
  const { loggedUser } = useContext(UserContext);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    async function fetchInvites() {
      const response = await getInvitesReceived(loggedUser._id);
      setInvites(response.data);
    }
    if (loggedUser) fetchInvites();
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
        {invites.length > 0 ? (
          invites.map((invite) => (
            <li key={invite._id}>
              {invite.sender.username} wants to be your friend!
              <button onClick={() => handleAcceptInvite(invite._id)}>
                Accept
              </button>
              <button onClick={() => handleRejectInvite(invite._id)}>
                Reject
              </button>
            </li>
          ))
        ) : (
          <li>No invites yet.</li>
        )}
      </ul>
    </div>
  );
}

export default InviteList;
