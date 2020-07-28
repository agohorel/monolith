import React from "react";
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
            <Button>view</Button>
            <Button>edit</Button>
            <Button>delete</Button>
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
`;

const ButtonContainer = styled.div`
  button:not(:last-of-type) {
    margin-right: 2rem;
  }
`;

const PatchName = styled.p`
  font-size: 2.4rem;
`;
