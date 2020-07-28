import React from "react";
import { connect } from "react-redux";

import PatchDetailContainer from "../components/Patch Details/PatchDetailContainer";

const PatchDetails = ({ patch }) => {
  return <PatchDetailContainer patch={patch}></PatchDetailContainer>;
};

const mapStateToProps = (state) => {
  return {
    patch: state.patches.selectedPatch,
  };
};

export default connect(mapStateToProps, {})(PatchDetails);
