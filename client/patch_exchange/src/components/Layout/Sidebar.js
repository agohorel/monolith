import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { openSidebar, closeSidebar } from "../../actions/layoutActions";

import logo from "../../assets/logo.png";
import colors from "../../styles/colors";
import measurements from "../../styles/measurements";

const Sidebar = ({ isSidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <Drawer
      onMouseEnter={openSidebar}
      onMouseLeave={closeSidebar}
      isSidebarOpen={isSidebarOpen}
    >
      <LogoHeader>
        <Logo src={logo}></Logo>
        <Title isSidebarOpen={isSidebarOpen}>patch.exchange</Title>
      </LogoHeader>

      <Nav isSidebarOpen={isSidebarOpen}>
        <NavLink>patches</NavLink>
        <NavLink>feed</NavLink>
        <NavLink>inbox</NavLink>
        <NavLink>library</NavLink>
        <NavLink>uploads</NavLink>
      </Nav>
    </Drawer>
  );
};

const mapStateToProps = state => {
  return {
    isSidebarOpen: state.layout.isSidebarOpen
  };
};

export default connect(mapStateToProps, { openSidebar, closeSidebar })(Sidebar);

const Drawer = styled.div`
  transition: ${props =>
    props.isSidebarOpen
      ? ".15s ease-out width, .15s ease-out padding"
      : ".15s .15s ease-out width, .15s .15s ease-out padding"};
  width: ${props =>
    props.isSidebarOpen
      ? `${measurements.sidebarWidthOpen}`
      : `${measurements.sidebarWidthClosed}`};
  background-color: ${colors.darkgrey};
  display: inline-block;
  padding: ${props => (props.isSidebarOpen ? "2rem" : "1rem")};
  height: 100vh;
  position: fixed;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
`;

const LogoHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 7rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  transition: ${props =>
    props.isSidebarOpen
      ? ".15s .15s ease-out opacity"
      : ".15s ease-in opacity"};
  opacity: ${props => (props.isSidebarOpen ? 1 : 0)};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  transition: ${props =>
    props.isSidebarOpen
      ? ".15s .15s ease-out opacity"
      : ".15s ease-in opacity"};
  opacity: ${props => (props.isSidebarOpen ? 1 : 0)};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.offwhite};
  font-size: 2.4rem;

  :hover {
    text-decoration: line-through;
    font-weight: bold;
  }
`;