import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import SignOut from "../Authentication/SignOut";
import Chat from "../Chat/Chat";
import "./Home.scss";

const Home = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(null);
  const [sendTo, setSendTo] = useState("");
  const [status, setStatus] = useState("");
  const getUsers = async () => {
    const querySnap = await db
      .collection("users")
      .where("uid", "!=", user.uid)
      .get();
    const allUsers = querySnap.docs.map((docSnap) => docSnap.data());
    setUsers(allUsers);
  };
  useEffect(() => {
    getUsers();
    db.collection("users").doc(user.uid).update({ status: "Online" }); // eslint-disable-next-line
  }, []); 
  return (
    <div>
      <SignOut user={user} />
      <div className="home__container">
        <div className="home__container__left-panel">
          {users.map((user) => (
            <div
              key={user.uid}
              className="home__container__left-panel__user"
              onClick={() => {
                setName(user.name.toUpperCase());
                setSendTo(user.uid);
                setStatus(user?.status);
              }}
            >
              <h4>{user.name.toUpperCase()}</h4>
              <h5 className="home__container__left-panel__user__email">
                {user.email}
              </h5>
            </div>
          ))}
        </div>
        <div className="home__container__right-panel">
          <Chat name={name} sendTo={sendTo} status={status}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
