import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthForm from "./components/Forms/AuthForm";
import AddPatch from "./pages/AddPatch";
import AddVersion from "./pages/AddVersion";
import EditPatch from "./pages/EditPatch";
import SearchPatches from "./pages/Search";
import MyPatches from "./pages/MyPatches";
import PatchDetails from "./pages/PatchDetails";
import PrivateRoute from "./components/PrivateRoute";

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
        <Route exact path="/patches/:name/:id">
          <PatchDetails></PatchDetails>
        </Route>
        <PrivateRoute path="/my-patches" component={MyPatches}></PrivateRoute>
        <PrivateRoute path="/add-patch" component={AddPatch}></PrivateRoute>
        <PrivateRoute
          path="/patches/:name/edit"
          component={EditPatch}
        ></PrivateRoute>
        <PrivateRoute path="/add-version" component={AddVersion}></PrivateRoute>
        <PrivateRoute path="/search" component={SearchPatches}></PrivateRoute>
      </Layout>
    </Router>
  );
}

export default App;
