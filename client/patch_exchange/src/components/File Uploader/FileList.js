import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { ProgressBar } from "./ProgressBar";

import colors from "../../constants/colors";

const FileList = ({ fileList }) => {
  return (
    <Files>
      {fileList.map((file) => (
        <Row key={file.binary.name}>
          <Filename>{file.binary.name}</Filename>
          <ProgressWrapper>
            <ProgressBar progress={file.progress}></ProgressBar>
          </ProgressWrapper>
        </Row>
      ))}
    </Files>
  );
};

const mapStateToProps = (state) => {
  return {
    fileList: state.b2.fileList,
    uploading: state.b2.loading,
  };
};

export default connect(mapStateToProps, {})(FileList);

const Files = styled.div`
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`;
const Row = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  height: 50px;
  overflow: hidden;
`;

const Filename = styled.span`
  margin-bottom: 8px;
  font-size: 16px;
  color: ${colors.offwhite};
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
