import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { register, login } from "../../actions/authActions";

import { Form, Label, Input } from "./FormStyles";
import { Button } from "../Button/Button";

const AuthForm = ({ type, register, login }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "register") {
      register(formData, history);
    } else if (type === "login") {
      login(formData, history);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">username</Label>
        <Input type="text" name="username" onChange={handleChange} />
        {type === "register" && (
          <>
            <Label htmlFor="email">email</Label>
            <Input type="text" name="email" onChange={handleChange} />
          </>
        )}
        <Label htmlFor="password">password</Label>
        <Input type="password" name="password" onChange={handleChange} />
        <Button>{type}</Button>
      </Form>
    </>
  );
};

export default connect(null, { register, login })(AuthForm);
