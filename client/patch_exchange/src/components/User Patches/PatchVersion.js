import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import colors from "../../constants/colors.js";

import { Button } from "../Button/Button.js";

export const PatchVersion = ({ version, deleteVersion }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/edit-version/${version.id}`);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this version?"
      )
    ) {
      deleteVersion(version.id);
    }
  };

  return (
    <Version>
      <Details>
        <Name>{version.version}</Name>
        <Description>{version.description}</Description>
      </Details>
      <ButtonContainer>
        <StyledButton>
          <Icon icon={faEdit} onClick={handleEdit}></Icon>
        </StyledButton>
        <StyledButton delete>
          <Icon icon={faTrashAlt} onClick={handleDelete}></Icon>
        </StyledButton>
      </ButtonContainer>
    </Version>
  );
};

const Version = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.darkgrey};
  padding: 1rem;
  margin-bottom: 2rem;
  text-decoration: none;
  color: ${colors.offwhite};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  font-size: 3rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;

  button:not(:first-of-type) {
    margin-left: 2rem;
  }

  button {
    width: 50px;
    height: 50px;
  }
`;

const StyledButton = styled(Button)`
  :hover svg {
    color: ${(props) => (props.delete ? colors.failure : colors.info)};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;
