import React, { useState } from "react";
import axios from "axios";

import { Form, Label, Input } from "./FormStyles";
import { Button } from "../Button/Button";

export const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/auth/${type}`, formData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
