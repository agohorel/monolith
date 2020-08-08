import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../../constants/colors";

import { Button } from "../Button/Button";
import { Snackbar } from "../Snackbar/Snackbar";
import { getPatchById, deletePatch } from "../../actions/patchActions";

const ListUserPatches = ({ patches, getPatchById, deletePatch }) => {
  const handleSelect = (patch) => {
    getPatchById(patch.id);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this patch and all associated versions?"
      )
    ) {
      deletePatch(id);
    }
  };

  if (patches?.length) {
    return (
      <>
        {patches.map((patch) => (
          <Patch key={patch.id}>
            <PatchName>{patch.name}</PatchName>
            <ButtonContainer>
              <Link
                to={`/patches/${patch.name}/${patch.id}`}
                onClick={() => handleSelect(patch)}
              >
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

              <ButtonWrapper onClick={() => handleDelete(patch.id)}>
                <Button>delete</Button>
              </ButtonWrapper>
            </ButtonContainer>
          </Patch>
        ))}
      </>
    );
  } else {
    return <Snackbar type="warning">You don't have any patches yet!</Snackbar>;
  }
};

export default connect(null, { getPatchById, deletePatch })(ListUserPatches);

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

// not sure why, but onClick was not firing on the Button itself
// this div only exists to capture the click event and ideally shouldn't exist
// it's only here to keep keyboard acccessibility
const ButtonWrapper = styled.div`
  display: inline;
  margin-left: 2rem;
`;
