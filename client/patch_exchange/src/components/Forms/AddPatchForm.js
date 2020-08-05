import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchMetadataLists, createPatch } from "../../actions/patchActions";
import {
  addFile,
  uploadPatch,
  uploadPatchImage,
} from "../../actions/b2Actions";

import { FileUploader } from "../File Uploader/FileUploader";
import FileList from "../File Uploader/FileList";
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
  fileList,
}) => {
  const [uploaded, setUploaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    author_id: user?.id,
    author_name: user?.username,
    image_id: "",
    preview_url: "",
    repo_url: "",
    homepage_url: "",
    description: "",
    operating_systems: [],
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
        image_id: b2Response?.fileId,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const file of fileList) {
      if (file.type === "image") {
        await uploadPatchImage(file, user);
      } else {
        await uploadPatch(file, user);
      }
    }

    setUploaded(true);
  };

  useEffect(() => {
    if (uploaded) {
      createPatch(formData);
    }
  }, [uploaded, createPatch, formData]);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleTextChange}></Input>

      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleTextChange}></Textarea>

      <Label htmlFor="preview_url">preview url</Label>
      <Input id="preview_url" onChange={handleTextChange}></Input>

      <Label htmlFor="repo_url">repo url</Label>
      <Input id="repo_url" onChange={handleTextChange}></Input>

      <Label htmlFor="homepage_url">homepage url</Label>
      <Input id="homepage_url" onChange={handleTextChange}></Input>

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
      </SelectContainer>

      <UploadContainer>
        <FileUploader
          label="image"
          type="image"
          uploadProgress={
            fileList.filter((f) => f?.type === "image")[0]?.progress
          }
        ></FileUploader>
      </UploadContainer>

      <FileList fileList={fileList}></FileList>

      <Button>Add Patch</Button>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    metadataLists: state.patches.metadataLists,
    user: state.auth.user,
    b2Response: state.b2.response,
    fileList: state.b2.fileList,
  };
};

export default connect(mapStateToProps, {
  fetchMetadataLists,
  createPatch,
  uploadPatch,
  uploadPatchImage,
  addFile,
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

const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
