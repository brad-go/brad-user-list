import type { User } from '@/types';

import styled from 'styled-components';
import React, { useEffect, useRef, useCallback } from 'react';

import { Selectbox } from '@/components';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { checkUser, selectUser } from '@/store/usersSlice';

import ListItem from './ListItem';

interface ListProps {
  users: User[];
  isCheckedUsers?: boolean;
  withButton?: boolean;
  withCheckbox?: boolean;
  withProfile?: boolean;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const List = ({
  users,
  isCheckedUsers = false,
  withButton,
  withCheckbox,
  withProfile,
  onButtonClick,
}: ListProps) => {
  const dispatch = useAppDispatch();
  const { checkedUsers, selectedUser } = useAppSelector((state) => state);
  const listRef = useRef<HTMLUListElement>(null);

  const handleClickUser = (e: React.MouseEvent) => {
    const clickedUserId = Number((e.currentTarget as HTMLElement).id);

    dispatch(checkUser({ id: clickedUserId }));
    dispatch(selectUser({ id: clickedUserId }));
  };

  const scrollToElement = useCallback(() => {
    if (!withButton || !listRef.current || !selectedUser) {
      return;
    }

    const LIST_ITEM_HEIGHT = 40;
    const index = checkedUsers.findIndex(({ id }) => id === selectedUser.id);
    const position = index * LIST_ITEM_HEIGHT;

    listRef.current.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }, [checkedUsers, selectedUser, withButton]);

  useEffect(() => {
    scrollToElement();
  }, [scrollToElement]);

  return (
    <Container withButton={withButton}>
      <ListHeader withProfile={withProfile}>
        <Selectbox isCheckedUsers={isCheckedUsers} />
        <ListItemHeader withCheckbox={withCheckbox}>
          <h4>이름</h4>
          <h4>생년월일</h4>
        </ListItemHeader>
      </ListHeader>
      <ListBody ref={listRef} withButton={withButton}>
        {users.map(({ id, name, date, checked }, index) => (
          <>
            <ListItem
              key={id}
              id={id}
              name={name}
              date={date}
              checked={checked}
              selected={selectedUser && id === selectedUser.id}
              withCheckbox={withCheckbox}
              onClick={handleClickUser}
            />
            {index !== users.length - 1 && <DivisionLine />}
          </>
        ))}
      </ListBody>
      {withButton && (
        <ButtonContainer>
          <Button type="button" onClick={onButtonClick}>
            저장하기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div<Pick<ListProps, 'withButton'>>`
  position: relative;
  width: 250px;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    flex-grow: 1;
    width: 100%;
    height: ${({ withButton }) => (withButton ? '314px' : '293px')};
  }
`;

const ListHeader = styled.div<Pick<ListProps, 'withProfile'>>`
  position: relative;
  width: 100%;
  height: 93px;
  background-color: ${({ theme }) => theme.colors.lavender_50};
  line-height: 1.267;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: 49px;
    background-color: ${({ theme, withProfile }) =>
      withProfile && theme.colors.purple_60};
  }
`;

const ListItemHeader = styled.div<Pick<ListProps, 'withCheckbox'>>`
  display: grid;
  grid-template-columns: ${({ withCheckbox }) =>
    withCheckbox ? '90px 1fr' : '110px 1fr'};
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 20px;
  padding-top: 64px;

  h4 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    grid-template-columns: 2fr 3.048fr;
    height: 100%;
    padding-top: 0;
  }
`;

const ListBody = styled.ul<Pick<ListProps, 'withButton'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ withButton }) => (withButton ? '312px ' : '397px')};
  margin: 0;
  background-color: ${({ theme }) => theme.colors.white};
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.gray};
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: ${({ withButton }) =>
      withButton ? 'calc(100% - 144px)' : 'calc(100% - 49px)'};
  }
`;

const DivisionLine = styled.hr`
  width: calc(100% - 40px);
  margin: 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ButtonContainer = styled.div`
  bottom: 0;
  width: 100%;
  padding: 25px 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.275;

  &:hover {
    background-image: linear-gradient(rgb(0 0 0 / 5%) 0 0);
  }

  &:active {
    background-image: linear-gradient(rgb(255 255 255 / 5%) 0 0);
  }
`;

export default React.memo(List);
