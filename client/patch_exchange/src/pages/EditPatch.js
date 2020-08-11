import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPatchById } from "../actions/patchActions";

import PatchForm from "../components/Forms/PatchForm";

const EditPatch = ({ getPatchById, patch }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  useEffect(() => {
    // prevent re-fetch if pre-fetched
    if (patch?.details?.id !== Number(id)) {
      getPatchById(id);
    }
  }, [getPatchById, id, patch]);

  return (
    <>
      <PatchForm existingForm={patch} patchID={id} mode="edit"></PatchForm>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    patch: state.patches.selectedPatch,
  };
};

export default connect(mapStateToProps, { getPatchById })(EditPatch);
