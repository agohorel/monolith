import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCodeBranch,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

import { ExternalLink } from "./ExternalLink";

import colors from "../../constants/colors";

export const PatchDetailLinks = ({ links }) => {
  const iconMap = {
    homepage: faHome,
    preview: faVial,
    repository: faCodeBranch,
  };

  if (links) {
    return (
      <Links>
        {links.map((link) => {
          return (
            <Link key={link.url}>
              <Icon icon={iconMap[link.text]}></Icon>
              <ExternalLink link={link}></ExternalLink>;
            </Link>
          );
        })}
      </Links>
    );
  } else return null;
};

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Link = styled.div`
  display: flex;
  align-items: center;

  :hover svg {
    color: white;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${colors.lightgrey};
  transform: scale(2);
  margin-right: 1rem;
`;
