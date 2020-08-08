import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import colors from "../../constants/colors";

export const Snackbar = ({ type, children }) => {
  return (
    <Bar color={colors[type]}>
      <Icon icon={faExclamationCircle}></Icon>
      <Message>{children}</Message>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
`;

const Message = styled.h3`
  margin-left: 2rem;
  font-size: 2rem;
  color: ${colors.offwhite};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${colors.offwhite};
`;
