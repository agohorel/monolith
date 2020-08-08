import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPatchById } from "../actions/patchActions";

import VersionForm from "../components/Forms/VersionForm";

const EditVersion = ({ getPatchById, patch }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  // useEffect(() => {
  //   // prevent re-fetch if pre-fetched
  //   if (patch?.details?.id !== Number(id)) {
  //     getPatchById(id);
  //   }
  // }, []);

  console.log(patch.versions);

  const [existingVersionData] = patch?.versions.filter(
    (version) => version.id === Number(id)
  );

  return (
    <>
      <VersionForm
        existingForm={existingVersionData}
        patchID={id}
        mode="edit"
      ></VersionForm>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    patch: state.patches.selectedPatch,
  };
};

export default connect(mapStateToProps, { getPatchById })(EditVersion);
