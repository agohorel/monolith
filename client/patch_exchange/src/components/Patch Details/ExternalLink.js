import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

export const ExternalLink = ({ link }) => {
  return (
    <Link href={link.url} target="_blank" rel="noopener noreferrer">
      {link.text}
    </Link>
  );
};

const Link = styled.a`
  font-size: 2rem;
  text-decoration: none;
  color: ${colors.offwhite};

  :hover {
    color: ${colors.lightgrey};
    text-decoration: line-through;
  }
`;
