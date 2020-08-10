import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { PatchDetailList } from "./PatchDetailList";
import { PatchDetailLinks } from "./PatchDetailLinks";
import { PatchDetailVersions } from "./PatchDetailVersions";

import { getPatchById } from "../../actions/patchActions";

import colors from "../../constants/colors";

const PatchDetailContainer = ({ patch, b2Auth, getPatchById }) => {
  const { pathname: path } = useLocation();
  const id = path.substring(path.lastIndexOf("/") + 1, path.length);

  const links = [
    { text: "homepage", url: patch.homepage_url },
    { text: "preview", url: patch.preview_url },
    { text: "repository", url: patch.repo_url },
  ];

  useEffect(() => {
    // only fetch if not already pre-fetched from another page
    if (patch?.details?.id !== Number(id)) {
      getPatchById(id);
    }
  }, [getPatchById, patch, id]);

  if (patch.details) {
    return (
      <Container>
        <Title>{patch.details.name}</Title>
        <Author>{`by ${patch?.details?.author_name}`}</Author>
        <Image
          src={`${b2Auth?.downloadUrl}/b2api/v1/b2_download_file_by_id?fileId=${patch.details.image_id}`}
        ></Image>
        <div>
          <PatchDetailLinks title="links" links={links}></PatchDetailLinks>
          <PatchDetailList
            title="OS"
            items={patch.operating_systems}
          ></PatchDetailList>
          <PatchDetailList title="tags" items={patch.tags}></PatchDetailList>
          <PatchDetailVersions patch={patch}></PatchDetailVersions>
        </div>
        <Description>{patch.details.description}</Description>
      </Container>
    );
  } else return null;
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
