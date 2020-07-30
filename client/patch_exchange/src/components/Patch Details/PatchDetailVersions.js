import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

const releaseBadgeColors = {
  released: colors.success,
  "in development": colors.warning,
  deprecated: colors.failure,
};

export const PatchDetailVersions = ({ patch }) => {
  return (
    <Container>
      {patch.versions.map((version, idx) => {
        return (
          <Version key={idx}>
            <VersionName>{version.version}</VersionName>
            <VersionStatus status={version.status}>
              {version.status}
            </VersionStatus>
            <VersionDescription>{version.description}</VersionDescription>
            <VersionLinks></VersionLinks>
          </Version>
        );
      })}
    </Container>
  );
};

const Container = styled.div``;

const Version = styled.div`
  background: ${colors.midgrey};
  margin: 1rem 0;
  padding: 1rem;
`;

const VersionName = styled.p`
  font-size: 3rem;
`;

const VersionDescription = styled.p`
  font-size: 2rem;
`;

const VersionStatus = styled.p`
  background: ${(props) => releaseBadgeColors[props.status]};
  display: inline-block;
  padding: 5px;
  margin: 0.5rem 0;
`;

const VersionLinks = styled.div``;
