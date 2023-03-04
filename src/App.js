import { Routes, Route } from "react-router-dom";
import "./App.css";
import FindFriends from "./pages/FindFriends";
import Homepage from "./pages/Homepage";
import WoofrProfile from "./pages/WoofrProfile";
import IsPrivate from "./components/IsPrivate";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import EditProfile from "./pages/EditProfile";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/find" element={<FindFriends />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <WoofrProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
