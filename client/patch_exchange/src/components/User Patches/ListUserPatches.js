import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../../constants/colors";

import { Button } from "../Button/Button";

export const ListUserPatches = ({ patches }) => {
  return (
    <>
      {patches.map((patch) => (
        <Patch key={patch.id}>
          <PatchName>{patch.name}</PatchName>
          <ButtonContainer>
            <Link to={`/patches/${patch.name}`}>
              <Button>view</Button>
            </Link>
            <Link to="#">
              <Button>edit</Button>
            </Link>
            <Link to="#">
              <Button>delete</Button>
            </Link>
          </ButtonContainer>
        </Patch>
      ))}
    </>
  );
};

const Patch = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.midgrey};
  padding: 2rem;

  :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const ButtonContainer = styled.div`
  a:not(:last-of-type) {
    margin-right: 2rem;
  }
`;

const PatchName = styled.p`
  font-size: 2.4rem;
`;
