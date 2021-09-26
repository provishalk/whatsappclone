import React, { useEffect, useState } from "react";
import SendMessage from "../Old/SendMessage";
import { auth, db } from "../../firebase";
import "./Chat.scss";
const Chat = ({ name, sendTo, status }) => {
  const [messages, setMessages] = useState([]);
   const lastSeen = typeof(status)=="string"?status: status.toDate().toString();
  useEffect(() => {
    const { uid } = auth.currentUser;
    const docid = sendTo > uid ? uid + "-" + sendTo : sendTo + "-" + uid;
    const messageRef = db
      .collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .orderBy("createdAt");

    messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map((docSnap) => {
        const data = docSnap.data();
        if (data?.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    }); // eslint-disable-next-line
  }, [name]);
  return (
    <>
      {name && (
        <div className="chat">
          <div className="chat__chatWith__name-at-top">{name}({lastSeen})</div>
          <div>
            <div className="msgs">
              {messages.map(({ text, createdAt, sendBy }) => (
                <div key={createdAt}>
                  <div
                    className={`msg ${
                      sendBy === auth.currentUser.uid ? "sent" : "received"
                    }`}
                  >
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <SendMessage sendTo={sendTo} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
