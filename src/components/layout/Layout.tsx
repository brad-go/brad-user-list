import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from '@/components/header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 70px);
  margin-top: 70px;
  background-color: ${({ theme }) => theme.colors.lightGray_70};

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: calc(100vh - 108px);
    margin-top: 108px;
    padding-top: 47px;
  }
`;

export default Layout;
