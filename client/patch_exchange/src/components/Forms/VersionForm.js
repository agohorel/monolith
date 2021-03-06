import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  fetchMetadataLists,
  createPatchVersion,
  updateVersion,
} from "../../actions/patchActions";
import { addFile, uploadPatch } from "../../actions/b2Actions";

import { FileUploader } from "../File Uploader/FileUploader";
import FileList from "../File Uploader/FileList";
import { Form, Label, Input, Textarea, Select, Option } from "./FormStyles";
import { Button } from "../Button/Button";

const VersionForm = ({
  metadataLists,
  fetchMetadataLists,
  createPatchVersion,
  user,
  uploadPatch,
  updateVersion,
  b2Response,
  fileList,
  mode,
  existingForm,
}) => {
  const [uploaded, setUploaded] = useState(false);
  const { pathname: path } = useLocation();
  const path_suffix = path.substring(path.lastIndexOf("/") + 1, path.length);
  const patch_fk = mode === "edit" ? null : path_suffix;

  const [formData, setFormData] = useState({
    version: "",
    version_description: "",
    linux_file: "",
    windows_file: "",
    mac_file: "",
    android_file: "",
    ios_file: "",
    release_status: "",
    patch_fk,
  });

  useEffect(() => {
    if (mode === "edit") {
      setFormData({
        ...formData,
        version: existingForm.version,
        version_description: existingForm.description,
        linux_file: existingForm.linuxId,
        windows_file: existingForm.windowsId,
        mac_file: existingForm.macId,
        android_file: existingForm.androidId,
        ios_file: existingForm.iosID,
        release_status: existingForm.status,
      });
    }
  }, [existingForm]);

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      [b2Response?.fileInfo.os]: b2Response?.fileId,
    }));
  }, [b2Response]);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSingleDropdown = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: {
        id: e.target.selectedOptions[0].id,
        name: e.target.selectedOptions[0].textContent,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const file of fileList) {
      await uploadPatch(file, user);
    }

    setUploaded(true);
  };

  useEffect(() => {
    if (uploaded) {
      if (mode === "edit") {
        updateVersion({
          ...formData,
          release_status: formData.release_status.id,
          version_id: path_suffix,
        });
      } else {
        createPatchVersion({
          ...formData,
          release_status: formData.release_status.id,
        });
      }
    }
  }, [
    uploaded,
    createPatchVersion,
    formData,
    mode,
    path_suffix,
    updateVersion,
  ]);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="version">version name</Label>
      <Input
        id="version"
        onChange={handleTextChange}
        value={formData.version}
      ></Input>

      <Label htmlFor="version_description">version description</Label>
      <Textarea
        id="version_description"
        onChange={handleTextChange}
        value={formData.version_description}
      ></Textarea>

      <SelectContainer>
        <Label htmlFor="release_status">release status</Label>
        <SelectRow style={{ marginBottom: "2rem" }}>
          {mode === "edit" && (
            <Select
              id="release_status"
              onChange={handleSingleDropdown}
              value={formData.release_status?.name}
            >
              {metadataLists.release_statuses?.map((releaseStatus) => {
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
          )}
          {mode !== "edit" && (
            <Select id="release_status" onChange={handleSingleDropdown}>
              {metadataLists.release_statuses?.map((releaseStatus) => {
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
          )}
        </SelectRow>
      </SelectContainer>

      <UploadContainer>
        {metadataLists.operating_systems?.map((os) => {
          return (
            <FileUploader
              key={os.id}
              label={os.os_name}
              uploadProgress={
                fileList.filter((f) => f?.os?.includes(os.os_name)).progress
              }
            ></FileUploader>
          );
        })}
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
  createPatchVersion,
  uploadPatch,
  updateVersion,
  addFile,
})(VersionForm);

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
