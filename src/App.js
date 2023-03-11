import { Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import FindFriends from "./pages/FindFriends";
import Landing from "./pages/Landing";
import WoofrProfile from "./pages/WoofrProfile";
import IsPrivate from "./components/Auth/IsPrivate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/find" element={<FindFriends />} />
        <Route path="/find" element={<isPrivate />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile/:userId" element={<WoofrProfile />} />
      </Routes>
    </div>
  );
}

export default App;
