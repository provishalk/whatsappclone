import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import "./App.css";
import Home from "./components/Home/Home.js";
import SignIn from "./components/Authentication/SignIn.js";
function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      {user ? (
        <Route path="/" exact component={() => (<Home user={user} />)}/>
      ) : (
        <>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
