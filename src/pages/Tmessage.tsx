
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const SendMessage = ({scroll}:any) => {
    const [message, setMessage] = useState("");
    const sendMessage = async (e:any) => {
        e.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <form className="send-message" onSubmit={(e)=>sendMessage(e)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="form-input__input"
        placeholder="type message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;