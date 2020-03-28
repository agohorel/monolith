import React from "react";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";
import colors from "../../styles/colors";
import measurements from "../../styles/measurements";

export const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar></Sidebar>
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.nearblack};
`;

const MainContainer = styled.div`
  margin-left: ${measurements.navWidth};
`;
