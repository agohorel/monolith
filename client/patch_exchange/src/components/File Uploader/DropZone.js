// https://malcoded.com/posts/react-dropzone/

import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addFile, addImage } from "../../actions/b2Actions";

import colors from "../../constants/colors";

const DropZone = ({ type, label, disabled, addFile, addImage }) => {
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef(null);

  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current.click();
  };

  const onFileAdded = (e) => {
    if (disabled) return;
    else if (type === "image") {
      addImage({ binary: e.target.files[0], progress: 0, type: "image" });
    } else {
      addFile({
        os: e.target.id,
        binary: e.target.files[0],
        progress: 0,
        type: "patch",
      });
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = (e) => {
    setHighlight(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    else if (type === "image") {
      addImage({ binary: e.dataTransfer.files[0], progress: 0, type: "image" });
    } else {
      addFile({
        os: `${label}_file`,
        binary: e.dataTransfer.files[0],
        progress: 0,
        type: "patch",
      });
    }
  };

  return (
    <Dropzone
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      disabled={disabled}
      highlight={highlight}
    >
      <Icon alt="upload"></Icon>
      <Input
        id={`${label}_file`}
        ref={inputRef}
        type="file"
        onChange={onFileAdded}
      ></Input>
      <Text>Upload A File</Text>
    </Dropzone>
  );
};

export default connect(null, { addFile, addImage })(DropZone);

const Dropzone = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${(props) =>
    props.highlight ? `${colors.offwhite}` : `${colors.midgrey}`};
  border: 2px dashed rgb(187, 186, 186);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const Icon = styled.img``;

const Text = styled.span``;

const Input = styled.input`
  display: none;
`;
