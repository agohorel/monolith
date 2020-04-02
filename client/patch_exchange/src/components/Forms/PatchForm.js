import React, { useState, useEffect } from "react";
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
  }, [fetchMetadataLists]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // redux action here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleChange}></Input>
      <Label htmlFor="imageUrl">image url</Label>
      <Input id="imageUrl" onChange={handleChange}></Input>
      <Label htmlFor="previewUrl">preview url</Label>
      <Input id="previewUrl" onChange={handleChange}></Input>
      <Label htmlFor="repoUrl">repo url</Label>
      <Input id="repoUrl" onChange={handleChange}></Input>
      <Label htmlFor="version">version name</Label>
      <Input id="version" onChange={handleChange}></Input>
      <Label htmlFor="fileUrl">file url</Label>
      <Input id="fileUrl" onChange={handleChange}></Input>
      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleChange}></Textarea>

      <Label htmlFor="release_status">release status</Label>
      <Select id="release_status" onChange={handleChange}>
        {metadataLists.releaseStatuses?.map(releaseStatus => {
          return (
            <Option
              key={releaseStatus.id}
              id={releaseStatus.release_status}
              value={releaseStatus.release_status}
            >
              {releaseStatus.release_status}
            </Option>
          );
        })}
      </Select>

      <Label htmlFor="os">os compatibility</Label>
      <Select id="os" onChange={handleChange}>
        {metadataLists.operatingSystems?.map(os => {
          return (
            <Option key={os.id} id={os.os_name} value={os.os_name}>
              {os.os_name}
            </Option>
          );
        })}
      </Select>

      <Label htmlFor="platform">platform</Label>
      <Select id="platforms" onChange={handleChange}>
        {metadataLists.platforms?.map(platform => {
          return (
            <Option
              key={platform.id}
              id={platform.platform_name}
              value={platform.platform_name}
            >
              {platform.platform_name}
            </Option>
          );
        })}
      </Select>

      <Label htmlFor="categories">categories</Label>
      <Select id="categories" onChange={handleChange}>
        {metadataLists.categories?.map(category => {
          return (
            <Option
              key={category.id}
              id={category.category_name}
              value={category.category_name}
            >
              {category.category_name}
            </Option>
          );
        })}
      </Select>

      <Label htmlFor="tags">tags</Label>
      <Select id="tags" onChange={handleChange}>
        {metadataLists.tags?.map(tag => {
          return (
            <Option key={tag.id} id={tag.tag} value={tag.tag}>
              {tag.tag}
            </Option>
          );
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
