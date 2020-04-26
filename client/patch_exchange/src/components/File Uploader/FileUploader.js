// https://malcoded.com/posts/react-file-upload/

import React from "react";
import styled from "styled-components";

import DropZone from "./DropZone";

export const FileUploader = ({ label, type, uploadProgress }) => {
  return (
    <Uploader>
      <Title>upload {label} file</Title>
      <Content>
        <DropZone
          type={type}
          label={label}
          disabled={uploadProgress > 0 || uploadProgress === 100}
        ></DropZone>
      </Content>
      <Actions></Actions>
    </Uploader>
  );
};

const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
`;

const Title = styled.span`
  margin-bottom: 32px;
  color: #555;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
`;

const Files = styled.div`
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 32px;
`;

const Row = styled.div``;
const Filename = styled.span``;
