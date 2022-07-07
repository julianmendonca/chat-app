import { useEffect, useState } from "react";
import { Button } from "ui";
import { io } from "socket.io-client";

const socket = io("https://chat-app-server-tau.vercel.app/", {
  transports: ["websocket"],
});
export default function Web() {
  const [chat, setChat] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("send message", (data) => {
      setChat((chat) => [...chat, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!inputValue) return;
    socket.emit("send message", inputValue);
    setInputValue("");
  };

  return (
    <div>
      <h1>The amazing chat!</h1>
      <div
        style={{
          height: "50vh",
          overflowY: "scroll",
          marginBottom: 30,
          border: "1px solid black",
          maxWidth: "50vw",
        }}
      >
        {chat.map((message, index) => (
          <p key={message + index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}
