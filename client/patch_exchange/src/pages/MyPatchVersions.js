import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import colors from "../constants/colors";

const MyPatchVersions = ({ versions }) => {
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
};

const mapStateToProps = (state) => {
  return {
    versions: state.patches.selectedPatch.versions,
  };
};

export default connect(mapStateToProps, {})(MyPatchVersions);

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
