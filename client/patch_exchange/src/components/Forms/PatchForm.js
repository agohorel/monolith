import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchMetadataLists, createPatch } from "../../actions/patchActions";
import { uploadPatch, uploadPatchImage } from "../../actions/b2Actions";

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
  b2Response,
  uploadPatchImage,
}) => {
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const [formData, setFormData] = useState({
    user_id: user?.id,
    name: "",
    image_file: "",
    preview_url: "",
    repo_url: "",
    homepage_url: "",
    version: "",
    description: "",
    linux_file: "",
    windows_file: "",
    macOS_file: "",
    android_file: "",
    iOS_file: "",
    releaseStatuses: [],
    operatingSystems: [],
    platforms: [],
    categories: [],
    tags: [],
  });

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  useEffect(() => {
    if (b2Response?.contentType.includes("image")) {
      setFormData((formData) => ({
        ...formData,
        image_file: b2Response?.fileId,
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [b2Response?.fileInfo.os]: b2Response?.fileId,
      }));
    }
  }, [b2Response]);

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
    setFileList([...fileList, [e.target.id, e.target.files[0]]]);
  };

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const file of fileList) {
      await uploadPatch(file[0], file[1], user);
    }

    await uploadPatchImage(image, user);

    setIsUploadComplete(true);
  };

  useEffect(() => {
    if (isUploadComplete) {
      createPatch(formData);
    }
  }, [isUploadComplete, createPatch, formData]);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleTextChange}></Input>
      {/* 
      <Label htmlFor="image_url">image url</Label>
      <Input id="image_url" onChange={handleTextChange}></Input> */}

      <FileUploader
        handleFileChange={handleImageSelect}
        label="image"
        type="image"
      ></FileUploader>

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
    b2Response: state.b2.response,
  };
};

export default connect(mapStateToProps, {
  fetchMetadataLists,
  createPatch,
  uploadPatch,
  uploadPatchImage,
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
