import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../../constants/colors";

import { Button } from "../Button/Button";
import { getPatchById } from "../../actions/patchActions";

const ListUserPatches = ({ patches, getPatchById }) => {
  const handleSelect = (patch) => {
    getPatchById(patch.id);
  };

  return (
    <>
      {patches.map((patch) => (
        <Patch key={patch.id} onClick={() => handleSelect(patch)}>
          <PatchName>{patch.name}</PatchName>
          <ButtonContainer>
            <Link to={`/patches/${patch.name}/${patch.id}`}>
              <Button>view</Button>
            </Link>
            <Link to={`add-version/${patch.id}`}>
              <Button>add version</Button>
            </Link>
            <Link
              to={`/patches/${patch.name}/edit/${patch.id}`}
              onClick={() => handleSelect(patch)}
            >
              <Button>edit patch</Button>
            </Link>
            <Link
              to={`/patches/${patch.name}/edit-versions/${patch.id}`}
              onClick={() => handleSelect(patch)}
            >
              <Button>edit version</Button>
            </Link>
            <Link to="/#">
              <Button>delete</Button>
            </Link>
          </ButtonContainer>
        </Patch>
      ))}
    </>
  );
};

export default connect(null, { getPatchById })(ListUserPatches);

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
