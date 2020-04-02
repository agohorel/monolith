import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { fetchMetadataLists } from "../../actions/patchActions";

import { Form, Label, Input, Textarea, Select, Option } from "./FormStyles";
import { Button } from "../Button/Button";

const PatchForm = ({ metadataLists, fetchMetadataLists }) => {
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    preview_url: "",
    repo_url: "",
    version: "",
    file_url: "",
    description: "",
    release_status: "",
    os: "",
    platforms: "",
    categories: "",
    tags: ""
  });

  useEffect(() => {
    fetchMetadataLists();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // redux action here
  };

  console.log(metadataLists);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleChange}></Input>
      <Label htmlFor="image_url">image url</Label>
      <Input id="image_url" onChange={handleChange}></Input>
      <Label htmlFor="preview_url">preview url</Label>
      <Input id="preview_url" onChange={handleChange}></Input>
      <Label htmlFor="repo_url">repo url</Label>
      <Input id="repo_url" onChange={handleChange}></Input>
      <Label htmlFor="version">version name</Label>
      <Input id="version" onChange={handleChange}></Input>
      <Label htmlFor="file_url">file url</Label>
      <Input id="file_url" onChange={handleChange}></Input>
      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleChange}></Textarea>

      <Label htmlFor="release_status">release status</Label>
      <Select id="release_status">
        {metadataLists.releaseStatuses?.map(os => {
          return <Option value={os}>{os}</Option>;
        })}
      </Select>

      <Label htmlFor="os">os compatibility</Label>
      <Select id="os">
        {metadataLists.operatingSystems?.map(os => {
          return <Option value={os}>{os}</Option>;
        })}
      </Select>

      <Label htmlFor="os">platform</Label>
      <Select id="platform">
        {metadataLists.platforms?.map(os => {
          return <Option value={os}>{os}</Option>;
        })}
      </Select>

      <Label htmlFor="os">categories</Label>
      <Select id="categories">
        {metadataLists.categories?.map(os => {
          return <Option value={os}>{os}</Option>;
        })}
      </Select>

      <Button>Add Patch</Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    metadataLists: state.patches.metadataLists
  };
};

export default connect(mapStateToProps, { fetchMetadataLists })(PatchForm);
