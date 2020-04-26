import styled from "styled-components";
import colors from "../../constants/colors";

export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 3.2rem;
  color: ${colors.offwhite};
  font-weight: 100;
`;

export const ListsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const List = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${colors.midgrey};
`;

export const ListTitle = styled.h4`
  font-size: 2.4rem;
  color: ${colors.lightgrey};
`;

export const ListItem = styled.p`
  font-size: 1.8rem;
`;

export const Link = styled.a`
  font-size: 1.8rem;
  text-decoration: none;
  color: ${colors.offwhite};

  :hover {
    color: ${colors.lightgrey};
  }
`;
