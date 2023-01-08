import styled from 'styled-components';

import { Profile } from '@/components';

const UserDetail = () => {
  return (
    <Container>
      <Profile fullWidth />;
    </Container>
  );
};

const Container = styled.div`
  width: 622px;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
`;

export default UserDetail;
