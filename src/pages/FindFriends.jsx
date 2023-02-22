import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getAllUsers } from "../api";
import { Link } from "react-router-dom";

function FindFriends() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function hangleGetAllUsers() {
      const response = await getAllUsers();
      setAllUsers(response.data);
    }
    hangleGetAllUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Search For Friends</h1>
      <ul>
        {allUsers.map((user) => {
          return (
            <li key={user._id}>
              <Link to={`/woofr/${user._id}`}>
                <h3>{user.username}</h3>
              </Link>
              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  style={{ width: "20%" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FindFriends;
