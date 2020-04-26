import React from "react";
import { connect } from "react-redux";

import {
  SearchResultContainer,
  Title,
  ListsContainer,
  List,
  ListTitle,
  ListItem,
  Link,
} from "./SearchStyles";

const SearchResult = ({ searchResult: result }) => {
  return (
    <SearchResultContainer>
      <Title>{result.name}</Title>

      {result.homepageUrl && (
        <Link
          href={result.homepageUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          homepage
        </Link>
      )}

      {result.previewUrl && (
        <Link
          href={result.previewUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          preview
        </Link>
      )}

      {result.repoUrl && (
        <Link href={result.repoUrl} target="_blank" rel="noreferrer noopener">
          repo
        </Link>
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
  };
};

export default connect(mapStateToProps, {})(SearchResult);
