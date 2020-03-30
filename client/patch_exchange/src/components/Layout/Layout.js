import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Sidebar from "./Sidebar";
import colors from "../../styles/colors";
import measurements from "../../styles/measurements";

const Layout = ({ children, isSidebarOpen }) => {
  return (
    <Container>
      <Sidebar></Sidebar>
      <MainContainer isSidebarOpen={isSidebarOpen}>{children}</MainContainer>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    isSidebarOpen: state.layout.isSidebarOpen
  };
};

export default connect(mapStateToProps, {})(Layout);

const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.nearblack};
`;

const MainContainer = styled.div`
  transition: ${props =>
    props.isSidebarOpen ? ".15s ease-in margin" : ".15s .15s ease-out margin"};
  margin-left: ${props =>
    props.isSidebarOpen
      ? `${measurements.sidebarWidthOpen}`
      : `${measurements.sidebarWidthClosed}`};
`;
