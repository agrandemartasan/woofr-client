import { Routes, Route } from "react-router-dom";
import "./App.css";
import FindFriends from "./pages/FindFriends";
import WoofrProfile from "./pages/WoofrProfile";
import IsPrivate from "./components/IsPrivate";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/find" element={<FindFriends />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile/:userId" element={<WoofrProfile />} />
      </Routes>
    </div>
  );
}

export default App;
