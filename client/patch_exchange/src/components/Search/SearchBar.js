import React, { useState } from "react";
import { connect } from "react-redux";

import { searchPatch } from "../../actions/patchActions";

import { Form, Label, Input } from "../Forms/FormStyles";
import { Button } from "../Button/Button";

const SearchBar = ({ searchPatch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchPatch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>search patches</Label>
      <Input onChange={handleChange}></Input>
      <Button>search</Button>
    </Form>
  );
};

export default connect(null, { searchPatch })(SearchBar);
