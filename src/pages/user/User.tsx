import React, { useCallback } from 'react';
import styled from 'styled-components';

import { List, Profile } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser } from '@/store/usersSlice';

const User = () => {
  const dispatch = useAppDispatch();
  const { checkedUsers } = useAppSelector((state) => state);

  const handleClickUser = useCallback(
    (e: React.MouseEvent) => {
      const clickedUserId = Number((e.currentTarget as HTMLElement).id);

      dispatch(selectUser({ id: clickedUserId }));
    },
    [dispatch],
  );

  return (
    <Container>
      <List
        users={checkedUsers}
        withProfile
        isCheckedUsers
        onUserClick={handleClickUser}
      />
      <Profile />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  max-width: 622px;
  height: 425px;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    /* flex-direction: column;
    justify-content: space-between;
    gap: 0; */
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 20px 20px 30px 20px;

    & > div:nth-of-type(1) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 284px;
      padding: 0 20px 30px 20px;
      z-index: 10;
    }

    & > div:nth-of-type(2) {
    }
  }
`;

export default User;
