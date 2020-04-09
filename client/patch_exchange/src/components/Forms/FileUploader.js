import React from "react";
import { Label, Input } from "./FormStyles";

export const FileUploader = ({ label, handleFileChange, type }) => {
  return (
    <>
      {type === "image" ? (
        <Label htmlFor={`${label}_file`}>upload {label}</Label>
      ) : (
        <Label htmlFor={`${label}_file`}>upload {label} binary</Label>
      )}

      <Input
        type="file"
        id={`${label}_file`}
        onChange={handleFileChange}
      ></Input>
    </>
  );
};
