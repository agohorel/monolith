import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { toggleSidebar } from "../../actions/layoutActions";
import { logout } from "../../actions/authActions";

import logo from "../../assets/logo.png";
import colors from "../../constants/colors";
import measurements from "../../constants/measurements";
import timings from "../../constants/timings";

const Sidebar = ({ isSidebarOpen, toggleSidebar, logout, user }) => {
  const history = useHistory();

  return (
    <Drawer isSidebarOpen={isSidebarOpen}>
      <LogoHeader onClick={toggleSidebar}>
        <Logo src={logo}></Logo>
        <Title isSidebarOpen={isSidebarOpen}>patch.exchange</Title>
      </LogoHeader>

      <Nav isSidebarOpen={isSidebarOpen}>
        <NavLink to="/add-patch">upload</NavLink>
        <NavLink to="/search">search</NavLink>
        <NavLink to="/my-patches">my patches</NavLink>

        {user && <NavLink onClick={() => logout(history)}>log out</NavLink>}

        {!user && <NavLink to="/login">log in</NavLink>}
      </Nav>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.layout.isSidebarOpen,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { toggleSidebar, logout })(Sidebar);

const Drawer = styled.div`
  transition: ${(props) =>
    props.isSidebarOpen
      ? `${timings.sidebarAnimation} ease-in width, ${timings.sidebarAnimation} ease-in padding`
      : `${timings.sidebarAnimation} ${timings.sidebarAnimation} ease-out width, ${timings.sidebarAnimation} ${timings.sidebarAnimation} ease-out padding`};
  width: ${(props) =>
    props.isSidebarOpen
      ? `${measurements.sidebarWidthOpen}`
      : `${measurements.sidebarWidthClosed}`};
  background-color: ${colors.darkgrey};
  display: inline-block;
  padding: ${(props) => (props.isSidebarOpen ? "2rem" : "1rem")};
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
  transition: ${(props) =>
    props.isSidebarOpen
      ? `${timings.sidebarAnimation} ${timings.sidebarAnimation} ease-out opacity`
      : `${timings.sidebarAnimation} ease-in opacity`};
  opacity: ${(props) => (props.isSidebarOpen ? 1 : 0)};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  transition: ${(props) =>
    props.isSidebarOpen
      ? `${timings.sidebarAnimation} ${timings.sidebarAnimation} ease-out opacity`
      : `${timings.sidebarAnimation} ease-in opacity`};
  opacity: ${(props) => (props.isSidebarOpen ? 1 : 0)};
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
