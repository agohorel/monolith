import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPatchVersion } from "../actions/patchActions";

import VersionForm from "../components/Forms/VersionForm";

const EditVersion = ({ getPatchVersion, version }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  useEffect(() => {
    getPatchVersion(id);
  }, []);

  return (
    <>
      <VersionForm
        existingForm={version}
        patchID={id}
        mode="edit"
      ></VersionForm>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    version: state.patches.selectedVersion,
  };
};

export default connect(mapStateToProps, { getPatchVersion })(EditVersion);
