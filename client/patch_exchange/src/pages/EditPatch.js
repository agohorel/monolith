import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPatchById } from "../actions/patchActions";

import PatchForm from "../components/Forms/AddPatchForm";

const AddPatch = ({ getPatchById, patch }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  console.log(typeof id);

  useEffect(() => {
    if (id) {
      getPatchById(id);
    }
  }, []);

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

export default connect(mapStateToProps, { getPatchById })(AddPatch);
