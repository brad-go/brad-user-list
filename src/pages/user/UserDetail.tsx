import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Profile } from '@/components';
import { useAppSelector } from '@/hooks';

import ErrorBoundary from '../ErrorBoundary';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useAppSelector((state) => state.initialUsers);
  const user = users.find(({ id }) => id === Number(userId));

  return user ? (
    <Container>
      <Profile user={user} fullWidth />;
    </Container>
  ) : (
    <ErrorBoundary userError />
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
