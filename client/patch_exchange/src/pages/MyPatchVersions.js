import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { Snackbar } from "../components/Snackbar/Snackbar";
import { PatchVersion } from "../components/User Patches/PatchVersion";

import { getPatchVersions, deleteVersion } from "../actions/patchActions";

const MyPatchVersions = ({ versions, getPatchVersions, deleteVersion }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  useEffect(() => {
    getPatchVersions(id);
  }, [getPatchVersions, id]);

  if (versions?.length) {
    return (
      <Versions>
        {versions?.map((version) => (
          <PatchVersion
            key={version.id}
            version={version}
            deleteVersion={deleteVersion}
          ></PatchVersion>
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

export default connect(mapStateToProps, { getPatchVersions, deleteVersion })(
  MyPatchVersions
);

const Versions = styled.div`
  display: flex;
  flex-direction: column;
`;
