import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchMetadataLists, createPatch } from "../../actions/patchActions";
import { uploadPatch } from "../../actions/b2Actions";

import { FileUploader } from "./FileUploader";
import { PatchFormSelect } from "./PatchFormSelect";
import { Form, Label, Input, Textarea, Select, Option } from "./FormStyles";
import { Button } from "../Button/Button";

const PatchForm = ({
  metadataLists,
  fetchMetadataLists,
  createPatch,
  user,
  uploadPatch,
}) => {
  const [fileList, setFileList] = useState([]);

  const [formData, setFormData] = useState({
    user_id: user?.id,
    name: "",
    image_url: "",
    preview_url: "",
    repo_url: "",
    homepage_url: "",
    version: "",
    description: "",
    file_url: "",
    releaseStatuses: [],
    operatingSystems: [],
    platforms: [],
    categories: [],
    tags: [],
  });

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleMultiDropdown = (e) => {
    const values = [];
    // get current selections for each input
    document.querySelectorAll(`#${e.target.id}`).forEach((input) => {
      values.push(input.selectedOptions[0].id);
    });
    // de-duplicate and append to form state
    setFormData({ ...formData, [e.target.id]: [...new Set(values)] });
  };

  const handleSingleDropdown = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.selectedOptions[0].id,
    });
  };

  const handleFileChange = async (e) => {
    setFileList({ ...fileList, [e.target.id]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(fileList).map((file) => uploadPatch(fileList[file], user));
    // createPatch(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleTextChange}></Input>

      <Label htmlFor="image_url">image url</Label>
      <Input id="image_url" onChange={handleTextChange}></Input>

      <Label htmlFor="preview_url">preview url</Label>
      <Input id="preview_url" onChange={handleTextChange}></Input>

      <Label htmlFor="repo_url">repo url</Label>
      <Input id="repo_url" onChange={handleTextChange}></Input>

      <Label htmlFor="homepage_url">homepage url</Label>
      <Input id="homepage_url" onChange={handleTextChange}></Input>

      <Label htmlFor="version">version name</Label>
      <Input id="version" onChange={handleTextChange}></Input>

      {metadataLists.operatingSystems?.map((os) => {
        return (
          <FileUploader
            key={os.id}
            handleFileChange={handleFileChange}
            label={os.os_name}
          ></FileUploader>
        );
      })}

      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleTextChange}></Textarea>

      <SelectContainer>
        <PatchFormSelect
          category="operatingSystems"
          label="os compatibility"
          itemPropertyName="os_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="platforms"
          label="platform"
          itemPropertyName="platform_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="categories"
          label="categories"
          itemPropertyName="category_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <PatchFormSelect
          category="tags"
          label="tags"
          itemPropertyName="tag"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
        ></PatchFormSelect>

        <Label htmlFor="releaseStatuses">release status</Label>
        <SelectRow style={{ marginBottom: "2rem" }}>
          <Select id="releaseStatuses" onChange={handleSingleDropdown}>
            {metadataLists.releaseStatuses?.map((releaseStatus) => {
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

const mapStateToProps = (state) => {
  return {
    metadataLists: state.patches.metadataLists,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  fetchMetadataLists,
  createPatch,
  uploadPatch,
})(PatchForm);

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
