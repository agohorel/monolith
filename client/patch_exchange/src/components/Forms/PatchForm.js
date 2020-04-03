import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchMetadataLists, createPatch } from "../../actions/patchActions";

import { PatchFormSelect } from "./PatchFormSelect";
import { Form, Label, Input, Textarea, Select, Option } from "./FormStyles";
import { Button } from "../Button/Button";

const PatchForm = ({
  metadataLists,
  fetchMetadataLists,
  createPatch,
  user
}) => {
  const [formData, setFormData] = useState({
    user_id: user?.id,
    name: "",
    image_url: "",
    preview_url: "",
    repo_url: "",
    homepage_url: "",
    version: "",
    file_url: "",
    description: "",
    releaseStatuses: [],
    operatingSystems: [],
    platforms: [],
    categories: [],
    tags: []
  });

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  const handleChange = e => {
    if (
      typeof formData[e.target.id] === "string" &&
      e.target.id !== "releaseStatuses"
    ) {
      // handle text inputs
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else if (e.target.id === "releaseStatuses") {
      // handle release status - dropdown but only a single choice
      setFormData({
        ...formData,
        [e.target.id]: e.target.selectedOptions[0].id
      });
    } else {
      // update dropdowns that allow multiple choices
      const values = [];
      // get current selections for each input
      document.querySelectorAll(`#${e.target.id}`).forEach(input => {
        values.push(input.selectedOptions[0].id);
      });

      // de-duplicate and append to form state
      setFormData({ ...formData, [e.target.id]: [...new Set(values)] });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createPatch(formData);
  };

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
      <Label htmlFor="homepage_url">homepage url</Label>
      <Input id="homepage_url" onChange={handleChange}></Input>
      <Label htmlFor="version">version name</Label>
      <Input id="version" onChange={handleChange}></Input>
      <Label htmlFor="file_url">file url</Label>
      <Input id="file_url" onChange={handleChange}></Input>
      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleChange}></Textarea>

      <SelectContainer>
        <PatchFormSelect
          category="operatingSystems"
          label="os compatibility"
          itemPropertyName="os_name"
          handleChange={handleChange}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="platforms"
          label="platform"
          itemPropertyName="platform_name"
          handleChange={handleChange}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="categories"
          label="categories"
          itemPropertyName="category_name"
          handleChange={handleChange}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="tags"
          label="tags"
          itemPropertyName="tag"
          handleChange={handleChange}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <Label htmlFor="releaseStatuses">release status</Label>
        <SelectRow style={{ marginBottom: "2rem" }}>
          <Select id="releaseStatuses" onChange={handleChange}>
            {metadataLists.releaseStatuses?.map(releaseStatus => {
              return (
                <Option
                  key={releaseStatus.id}
                  id={releaseStatus.id}
                  value={releaseStatus.release_status}
                >
                  {releaseStatus.release_status}
                </Option>
              );
            })}
          </Select>
        </SelectRow>
      </SelectContainer>
      <Button>Add Patch</Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    metadataLists: state.patches.metadataLists,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { fetchMetadataLists, createPatch })(
  PatchForm
);

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const SelectRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  select {
    width: 100%;
  }
`;
