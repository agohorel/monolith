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
import { Form, Label, Input, Textarea } from "./FormStyles";
import { Button } from "../Button/Button";

const PatchForm = ({
  metadataLists,
  fetchMetadataLists,
  createPatch,
  user,
  b2Response,
  uploadPatchImage,
  fileList,
  patchToEdit,
  mode,
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
    setFormData({
      name: patchToEdit?.details?.name || "",
      author_id: patchToEdit?.details?.author_id || user?.id,
      author_name: patchToEdit?.details?.author_name || user?.username,
      image_id: patchToEdit?.details?.image_id || "",
      preview_url: patchToEdit?.details?.preview_url || "",
      repo_url: patchToEdit?.details?.repo_url || "",
      homepage_url: patchToEdit?.details?.homepage_url || "",
      description: patchToEdit?.details?.description || "",
      operating_systems: patchToEdit?.operating_systems || [],
      platforms: patchToEdit?.platforms || [],
      categories: patchToEdit?.categories || [],
      tags: patchToEdit?.tags || [],
    });
  }, [patchToEdit]);

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      image_id: b2Response?.fileId,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const file of fileList) {
      if (file.type === "image") {
        await uploadPatchImage(file, user);
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
      <Input
        id="name"
        value={formData.name}
        onChange={handleTextChange}
      ></Input>

      <Label htmlFor="description">description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={handleTextChange}
      ></Textarea>

      <Label htmlFor="preview_url">preview url</Label>
      <Input
        id="preview_url"
        value={formData.preview_url}
        onChange={handleTextChange}
      ></Input>

      <Label htmlFor="repo_url">repo url</Label>
      <Input
        id="repo_url"
        value={formData.repo_url}
        onChange={handleTextChange}
      ></Input>

      <Label htmlFor="homepage_url">homepage url</Label>
      <Input
        id="homepage_url"
        value={formData.homepage_url}
        onChange={handleTextChange}
      ></Input>

      <SelectContainer>
        <PatchFormSelect
          category="operating_systems"
          label="os compatibility"
          itemPropertyName="os_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
          existingForm={formData}
          mode={mode}
        ></PatchFormSelect>

        <PatchFormSelect
          category="platforms"
          label="platform"
          itemPropertyName="platform_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
          existingForm={formData}
          mode={mode}
        ></PatchFormSelect>

        <PatchFormSelect
          category="categories"
          label="categories"
          itemPropertyName="category_name"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
          existingForm={formData}
          mode={mode}
        ></PatchFormSelect>

        <PatchFormSelect
          category="tags"
          label="tags"
          itemPropertyName="tag"
          handleChange={handleMultiDropdown}
          metadataLists={metadataLists}
          existingForm={formData}
          mode={mode}
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
    patchToEdit: state.patches.selectedPatch,
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

const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
