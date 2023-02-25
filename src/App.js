import { Routes, Route } from "react-router-dom";
import "./App.css";
import FindFriends from "./pages/FindFriends";
import Homepage from "./pages/Homepage";
import WoofrProfile from "./pages/WoofrProfile";
import IsPrivate from "./components/IsPrivate";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/find"
          element={
            <IsPrivate>
              <FindFriends />
            </IsPrivate>
          }
        />
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
