import React from "react";
import { Button } from "@material-ui/core";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";

const SignOut = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#FAFAFA",
        top: 0,
        borderBottom: "solid 1px lightgray",
        zIndex: "10",
      }}
    >
      <Button
        style={{
          padding: "20px",
          fontSize: "15px",
          borderRadius: "0",
          fontWeight: "600",
        }}
        onClick={() => {
          console.log(user.uid);
          db.collection("users")
            .doc(user.uid)
            .update({
              status: firebase.firestore.FieldValue.serverTimestamp(),
            });
          auth.signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
