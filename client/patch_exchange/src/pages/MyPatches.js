import React, { useEffect } from "react";
import { connect } from "react-redux";

import ListUserPatches from "../components/User Patches/ListUserPatches";

import { fetchUserPatches } from "../actions/patchActions";

const MyPatches = ({ fetchUserPatches, userPatches, userID }) => {
  useEffect(() => {
    fetchUserPatches(userID);
  }, [fetchUserPatches, userID]);

  return <ListUserPatches patches={userPatches}></ListUserPatches>;
};

const mapStateToProps = (state) => {
  return {
    userID: state?.auth?.user?.id,
    userPatches: state.patches.userPatches,
  };
};

export default connect(mapStateToProps, { fetchUserPatches })(MyPatches);
