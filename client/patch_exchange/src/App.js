import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthForm from "./components/AuthForm/AuthForm";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/register">
          <AuthForm type="register"></AuthForm>
        </Route>
        <Route path="/login">
          <AuthForm type="login"></AuthForm>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
