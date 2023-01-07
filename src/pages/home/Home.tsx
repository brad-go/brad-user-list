import styled from 'styled-components';
import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Arrow from '@/assets/svgs/arrow.svg';
import { List } from '@/components';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { updateUserList } from '@/store/usersActions';
import { checkUser, selectUser } from '@/store/usersSlice';

const Home = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { users, checkedUsers } = useAppSelector((state) => state);

  const handleClickUser = useCallback(
    (e: React.MouseEvent) => {
      const clickedUserId = Number((e.currentTarget as HTMLElement).id);

      dispatch(checkUser({ id: clickedUserId }));
      dispatch(selectUser({ id: clickedUserId }));
    },
    [dispatch],
  );

  const handleClickButton = useCallback(() => {
    dispatch(updateUserList(users));
  }, [dispatch, users]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Container>
      <List users={users} withCheckbox onUserClick={handleClickUser} />
      <ArrowBox>
        <Arrow />
      </ArrowBox>
      <List
        users={checkedUsers}
        withButton
        isCheckedUsers
        onUserClick={handleClickUser}
        onButtonClick={handleClickButton}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 47px;
  height: 490px;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 20px 20px 30px 20px;
  }
`;

const ArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 50px;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    width: 100%;
    height: 20px;
    flex-shrink: 0;

    & > svg {
      width: 20px;
      transform: rotate(90deg);
    }
  }
`;

export default Home;
