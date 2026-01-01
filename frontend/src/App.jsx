import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import  "./components/Login.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // NEW: logout function
  const logout = () => {
    localStorage.removeItem("token"); // remove JWT
    setLoggedIn(false);               // update state
  };

  if (!loggedIn) {
    return (
      <>
        <Register />
        <Login onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return <> 
    <Tasks />
    <button  className="logout-button" onClick={logout}>Logout</button>
    </>; // pass logout to Tasks
}
