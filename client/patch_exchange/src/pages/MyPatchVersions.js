import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import colors from "../constants/colors";
import { Snackbar } from "../components/Snackbar/Snackbar";

import { getPatchVersions } from "../actions/patchActions";

const MyPatchVersions = ({ versions, getPatchVersions }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  useEffect(() => {
    getPatchVersions(id);
  }, [getPatchVersions, id]);

  if (versions?.length) {
    return (
      <Versions>
        {versions?.map((version) => (
          <Version key={version.id} to={`/edit-version/${version.id}`}>
            <Name>{version.version}</Name>
            <Description>{version.description}</Description>
          </Version>
        ))}
      </Versions>
    );
  } else {
    return (
      <Snackbar type="warning">
        you don't have any versions for this patch!
      </Snackbar>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    versions: state.patches.selectedPatch.versions,
  };
};

export default connect(mapStateToProps, { getPatchVersions })(MyPatchVersions);

const Versions = styled.div`
  display: flex;
  flex-direction: column;
`;

const Version = styled(Link)`
  background: ${colors.darkgrey};
  padding: 1rem;
  margin-bottom: 2rem;
  text-decoration: none;
  color: ${colors.offwhite};
`;

const Name = styled.h3`
  font-size: 3rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
`;
