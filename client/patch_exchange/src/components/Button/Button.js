import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

export const Button = ({ className, children }) => {
  return <StyledButton className={className}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: ${colors.nearblack};
  color: ${colors.offwhite};
  font-size: 1.6rem;

  :hover {
    cursor: pointer;
    background-color: ${colors.lightgrey};
    color: ${colors.nearblack};
  }
`;
