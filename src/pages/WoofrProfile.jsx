import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api";

function WoofrProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  console.log("user", user);

  useEffect(() => {
    async function handleGetUserDetails() {
      const response = await getUser(userId);
      setUser(response.data);
    }

    if (userId) {
      handleGetUserDetails();
      console.log("loggedUser", userId);
    }
  }, [userId]);

  return (
    <>
      <Nav />
      <div>
        <div>
          <h1> {user.username} </h1>
          <img src={user.profilePicture} alt={user.username} />
        </div>
        <div>
          <h3>{user.info.location}</h3>
          <h2>{user.info.bio}</h2>
        </div>
        <div>
          <p>{user.info.birthday}</p>
          <p>{user.info.gender}</p>
          <p>{user.info.breed}</p>
          <p>{user.info.size}</p>
        </div>
        <div>
          <h3>Is {user.username} Neutered/Spayed?</h3>
          <p>{user.info.isNeuteredOrSpayed ? "Yes" : "No"}</p>
          <h3>Is {user.username} Vaccinated?</h3>
          <p>{user.info.isVaccinated ? "Yes" : "No"}</p>
          <h3>Is {user.username} Trained?</h3>
          <p>{user.info.isTrained ? "Yes" : "No"}</p>
        </div>
      </div>
    </>
  );
}

export default WoofrProfile;
