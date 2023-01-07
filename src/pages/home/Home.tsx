import styled from 'styled-components';
import React from 'react';

import Arrow from '@/assets/svgs/arrow.svg';
import { List } from '@/components';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { updateUserList } from '@/store/usersActions';

const Home = () => {
  const dispatch = useAppDispatch();
  const { users, checkedUsers } = useAppSelector((state) => state);

  const handleClickButton = () => {
    dispatch(updateUserList(users));
  };

  return (
    <Container>
      <List users={users} withCheckbox />
      <ArrowBox>
        <Arrow />
      </ArrowBox>
      <List
        users={checkedUsers}
        withButton
        isCheckedUsers
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
