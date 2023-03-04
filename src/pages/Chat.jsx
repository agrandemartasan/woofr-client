import Nav from "../components/Nav";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";

function Chat() {
  return (
    <>
      <Nav />
      <div>
        Chat
        <ChatList />
        {/* <ChatRoom /> */}
      </div>
    </>
  );
}

export default Chat;
