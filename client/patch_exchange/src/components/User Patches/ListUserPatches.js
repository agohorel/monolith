import React from "react";
import styled from "styled-components";

export const ListUserPatches = ({ patches }) => {
  return (
    <>
      {patches.map((patch) => (
        <PatchName key={patch.id}>{patch.name}</PatchName>
      ))}
    </>
  );
};

const PatchName = styled.p`
  font-size: 2.4rem;
`;
