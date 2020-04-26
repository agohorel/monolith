import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { ProgressBar } from "./ProgressBar";

const FileList = ({ fileList }) => {
  console.log(fileList);
  return (
    <Files>
      {fileList.map((file) => (
        <Row key={file.binary.name}>
          <Filename>{file.binary.name}</Filename>
          {/* {file.progress > 0 ||
            (file.progress === 100 && ( */}
          <ProgressWrapper>
            <ProgressBar progress={file.progress}></ProgressBar>
          </ProgressWrapper>
          // ))}
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
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`;
const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  padding: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;

const Filename = styled.span`
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
