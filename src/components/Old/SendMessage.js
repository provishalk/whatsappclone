import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";

const SendMessage = ({ sendTo }) => {
  const [message, setMessage] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    if (!message) {
      alert("Type Something");
      return;
    }
    const { uid } = auth.currentUser;
    const docid = sendTo > uid ? uid + "-" + sendTo : sendTo + "-" + uid;
    await db.collection("chatrooms").doc(docid).collection("messages").add({
      text: message,
      sendBy: uid,
      sendTo,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
    // scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <form onSubmit={sendMessage}>
      <div className="sendMsg">
        <Input
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Message..."
          style={{
            width: "78%",
            fontSize: "15px",
            fontWeight: "550",
            marginLeft: "5px",
            marginBottom: "-3px",
          }}
        />
        <Button
          type="submit"
          style={{
            width: "18%",
            fontSize: "15px",
            fontWeight: "550",
            margin: "4px 5% -13px 5%",
            maxWidth: "200px",
          }}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default SendMessage;
