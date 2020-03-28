import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/logo.png";
import colors from "../../styles/colors";
import measurements from "../../styles/measurements";

export const Sidebar = () => {
  return (
    <Drawer>
      <LogoHeader>
        <Logo src={logo}></Logo>
        <Title>patch.exchange</Title>
      </LogoHeader>

      <Nav>
        <NavLink>patches</NavLink>
        <NavLink>feed</NavLink>
        <NavLink>inbox</NavLink>
        <NavLink>library</NavLink>
        <NavLink>uploads</NavLink>
      </Nav>
    </Drawer>
  );
};

const Drawer = styled.div`
  width: ${measurements.navWidth};
  background-color: ${colors.darkgrey};
  display: inline-block;
  padding: 2rem;
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
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.nearblack};
  font-size: 2.4rem;
  font-weight: bold;

  :hover {
    text-decoration: line-through;
    font-weight: bolder;
  }
`;
