import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { INITIAL_USER } from '@/constants/users';
import { Profile } from '@/components';
import { useAppSelector } from '@/hooks';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useAppSelector((state) => state.initialUsers);
  const user = users.find(({ id }) => id === Number(userId));

  return (
    <Container>
      <Profile user={user || INITIAL_USER} fullWidth />;
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
