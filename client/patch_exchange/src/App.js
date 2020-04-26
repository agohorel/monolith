import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthForm from "./components/Forms/AuthForm";
import AddPatch from "./pages/AddPatch";
import SearchPatches from "./pages/Search";

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
        <Route path="/add-patch">
          <AddPatch></AddPatch>
        </Route>
        <Route path="/search">
          <SearchPatches></SearchPatches>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
