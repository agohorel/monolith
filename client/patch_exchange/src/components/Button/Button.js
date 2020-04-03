import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

export const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: ${colors.midgrey};
  color: ${colors.offwhite};

  :hover {
    cursor: pointer;
    background-color: ${colors.nearblack};
  }
`;
