import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchMetadataLists } from "../../actions/patchActions";

import { PatchFormSelect } from "./PatchFormSelect";
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
    releaseStatuses: "",
    operatingSystems: [],
    platforms: [],
    categories: [],
    tags: []
  });

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  const handleChange = e => {
    if (typeof formData[e.target.id] === "string") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else {
      // update array fields
      setFormData({
        ...formData,
        [e.target.id]: [...formData[e.target.id], e.target.value]
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // redux action here
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
                  id={releaseStatus.release_status}
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
    metadataLists: state.patches.metadataLists
  };
};

export default connect(mapStateToProps, { fetchMetadataLists })(PatchForm);

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
