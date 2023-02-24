import { useState, useEffect } from "react";
import { getInvites, acceptInvite, rejectInvite } from "./api";

function InviteList({ userId }) {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const inviteList = await getInvites(userId);
      setInvites(inviteList);
    };

    fetchInvites();
  }, [userId]);

  async function handleAcceptInvite(inviteId) {
    try {
      await acceptInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRejectInvite(inviteId) {
    try {
      await rejectInvite(inviteId);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.error(error);
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
