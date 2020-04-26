import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addFile, addImage } from "../../actions/b2Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

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
      <Icon icon={faFileUpload} alt="upload"></Icon>
      <Input
        id={`${label}_file`}
        ref={inputRef}
        type="file"
        onChange={onFileAdded}
      ></Input>
    </Dropzone>
  );
};

export default connect(null, { addFile, addImage })(DropZone);

const Dropzone = styled.div`
  width: 67%;
  height: 200px;
  background-color: ${(props) =>
    props.highlight ? `${colors.offwhite}` : `${colors.midgrey}`};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  :hover {
    opacity: 0.8;

    svg {
      color: ${colors.nearblack};
    }
  }
`;

const Input = styled.input`
  display: none;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${colors.offwhite};
  margin-left: 1rem;
  font-size: calc(20px + 2vw);
  :hover {
    cursor: pointer;
    color: ${colors.nearblack};
  }
`;
