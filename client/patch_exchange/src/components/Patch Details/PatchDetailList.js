import React from "react";
import styled from "styled-components";

import colors from "../../constants/colors";

export const PatchDetailList = ({ title, items }) => {
  return (
    <div>
      <ListTitle>{title}</ListTitle>
      {items && (
        <List>
          {items.map((item, idx) => {
            return <ListItem key={`${item}${idx}`}>{item}</ListItem>;
          })}
        </List>
      )}
    </div>
  );
};

const ListTitle = styled.h3`
  font-size: 2rem;
`;

const List = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const ListItem = styled.li`
  font-size: 1.4rem;
  padding: 1rem;
  display: inline-block;
  background-color: ${colors.blackish};
  color: ${colors.offwhite};
  margin: 0.5rem 0.5rem 0.5rem 0;
`;
