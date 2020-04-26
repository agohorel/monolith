import React from "react";
import styled from "styled-components";

export const ProgressBar = ({ progress }) => {
  return (
    <ProgressContainer>
      <Progress progress={progress}></Progress>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgb(183, 155, 229);
  border-radius: 5px;
`;

const Progress = styled.div`
  width: ${(props) => `${props.progress}%`};
  background-color: rgba(103, 58, 183, 1);
  height: 50px;
  margin: 0;
  border-radius: 5px;
`;
