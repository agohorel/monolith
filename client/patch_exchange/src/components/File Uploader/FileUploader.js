import React from "react";
import styled from "styled-components";

import DropZone from "./DropZone";
import colors from "../../constants/colors";

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
  width: 33%;
`;

const Title = styled.h4`
  font-size: 16px;
  color: ${colors.offwhite};
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 100;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 32px;
`;

