import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

export const ProgressBar = ({ progress }) => {
  return (
    <ProgressContainer>
      <Progress progress={progress}></Progress>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${colors.nearblack};
  border-radius: 3px;
`;

const Progress = styled.div`
  width: ${(props) => `${props.progress}%`};
  background-color: ${colors.offwhite};
  height: 12px;
  margin: 0;
  border-radius: 3px;
`;
