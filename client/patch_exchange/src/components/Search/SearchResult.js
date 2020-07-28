import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  SearchResultContainer,
  Title,
  ListsContainer,
  List,
  ListTitle,
  ListItem,
  ExternalLink,
} from "./SearchStyles";

const SearchResult = ({ searchResult: result, b2Auth }) => {
  return (
    <SearchResultContainer>
      <Title>{result.name}</Title>
      {result.imageId && (
        <ImageLink to={`patches/${result.name}`}>
          <Image
            src={`${b2Auth.downloadUrl}/b2api/v1/b2_download_file_by_id?fileId=${result.imageId}`}
          ></Image>
        </ImageLink>
      )}

      {result.homepageUrl && (
        <ExternalLink
          href={result.homepageUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          homepage
        </ExternalLink>
      )}

      {result.previewUrl && (
        <ExternalLink
          href={result.previewUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          preview
        </ExternalLink>
      )}

      {result.repoUrl && (
        <ExternalLink
          href={result.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          repo
        </ExternalLink>
      )}

      {result.description && (
        <ListItem style={{ color: "#8c8c8c" }}>{result.description}</ListItem>
      )}

      <ListsContainer>
        {result.platforms && (
          <List>
            <ListTitle>platforms</ListTitle>
            {result.platforms?.map((platform) => (
              <ListItem key={platform}>{platform}</ListItem>
            ))}
          </List>
        )}

        {result.categories && (
          <List>
            <ListTitle>categories</ListTitle>
            {result.categories?.map((category) => (
              <ListItem key={category}>{category}</ListItem>
            ))}
          </List>
        )}

        {result.operatingSystems && (
          <List>
            <ListTitle>operating systems</ListTitle>
            {result.operatingSystems?.map((os) => (
              <ListItem key={os}>{os}</ListItem>
            ))}
          </List>
        )}

        {result.tags && (
          <List>
            <ListTitle>tags</ListTitle>
            {result.tags?.map((tag) => (
              <ListItem key={tag}>{tag}</ListItem>
            ))}
          </List>
        )}
      </ListsContainer>
    </SearchResultContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.patches.searchResult,
    b2Auth: state.auth.user.b2Auth,
  };
};

export default connect(mapStateToProps, {})(SearchResult);

const ImageLink = styled(Link)`
  display: flex;
  justify-content: center;

  :hover img {
    opacity: 0.5;
  }
`;

const Image = styled.img`
  width: 25%;
  object-fit: contain;
`;
