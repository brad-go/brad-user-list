import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Logo } from '@/assets/svgs/logo.svg';
import { ReactComponent as Cellular } from '@/assets/svgs/cellular.svg';
import { ReactComponent as Wifi } from '@/assets/svgs/wifi.svg';
import { ReactComponent as Battery } from '@/assets/svgs/battery.svg';
import { Clock } from '@/components/clock';

const Header = () => {
  return (
    <Container>
      <StatusBar>
        <Clock />
        <Status>
          <Cellular />
          <Wifi />
          <Battery />
        </Status>
      </StatusBar>
      <Logo />
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/">Page 01</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/user">Page 02</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 40px;
  background-color: ${({ theme }) => theme.colors.purple_60};
  z-index: 1000;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    flex-direction: column;
    align-items: flex-start;
    height: 108px;
    padding: 20px;
    padding-top: 14px;

    & > svg {
      width: 170px;
      height: 28px;
    }
  }
`;

const StatusBar = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Status = styled.div`
  display: flex;
  gap: 5px;
`;

const Nav = styled.nav`
  @media ${({ theme }) => theme.breakPoints.mobile} {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -47px;
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 35px;
  margin: 0;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    gap: 0;
    width: 100%;
    height: 47px;
  }
`;

const NavItem = styled.li`
  @media ${({ theme }) => theme.breakPoints.mobile} {
    width: 100%;
    height: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.normal};

  &.active {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding-top: 13px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.purple_20};

    &.active {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.purple};
    }

    &:hover {
      background-image: linear-gradient(rgb(0 0 0 / 5%) 0 0);
    }

    &:active {
      background-image: linear-gradient(rgb(255 255 255 / 5%) 0 0);
    }
  }
`;

export default Header;
