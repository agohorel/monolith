import React from "react";
import { AuthForm } from "./components/AuthForm/AuthForm";

function App() {
  return (
    <div>
      <AuthForm type="register"></AuthForm>
      <AuthForm type="login"></AuthForm>
    </div>
  );
}

export default App;
