import styled from 'styled-components';
import React, { useCallback } from 'react';

import Arrow from '@/assets/svgs/arrow.svg';
import { List } from '@/components';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { updateUserList } from '@/store/usersActions';
import { checkUser, selectUser } from '@/store/usersSlice';

const Home = () => {
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
  & > svg {
    width: 50px;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
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
