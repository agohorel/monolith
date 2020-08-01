import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { PatchDetailList } from "./PatchDetailList";
import { PatchDetailLinks } from "./PatchDetailLinks";
import { PatchDetailVersions } from "./PatchDetailVersions";

import { getPatchById } from "../../actions/patchActions";

import colors from "../../constants/colors";

const PatchDetailContainer = ({ patch, b2Auth, getPatchById }) => {
  const links = [
    { text: "homepage", url: patch.homepageUrl },
    { text: "preview", url: patch.previewUrl },
    { text: "repository", url: patch.repoUrl },
  ];

  useEffect(() => {
    getPatchById(patch.id);
  }, [getPatchById]);

  return (
    <Container>
      <Title>{patch?.name}</Title>
      <Author>{`by ${patch?.authorName}`}</Author>
      <Image
        src={`${b2Auth?.downloadUrl}/b2api/v1/b2_download_file_by_id?fileId=${patch?.imageId}`}
      ></Image>
      <div>
        <PatchDetailLinks title="links" links={links}></PatchDetailLinks>
        <PatchDetailList
          title="OS"
          items={patch.operatingSystems}
        ></PatchDetailList>
        <PatchDetailList title="tags" items={patch.tags}></PatchDetailList>
        <PatchDetailVersions patch={patch}></PatchDetailVersions>
      </div>
      <Description>{patch?.description}</Description>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    b2Auth: state.auth?.user?.b2Auth,
    patch: state.patches.selectedPatch,
  };
};

export default connect(mapStateToProps, { getPatchById })(PatchDetailContainer);

const Container = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
`;

const Title = styled.h1`
  grid-column-start: span 2;
  font-size: 5rem;
  color: ${colors.offwhite};
`;

const Author = styled.h3`
  grid-column-start: span 2;
  font-size: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: 60rem;
  object-fit: cover;
  object-position: center;
`;

const Description = styled.p`
  grid-column-start: 1;
  font-size: 1.4rem;
  color: ${colors.offwhite};
`;
