import type { User } from '@/types';

import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';

import { Selectbox } from '@/components';
import { useAppSelector } from '@/hooks';

import ListItem from './ListItem';

interface ListProps {
  users: User[];
  isCheckedUsers?: boolean;
  withButton?: boolean;
  withCheckbox?: boolean;
  withProfile?: boolean;
  onUserClick: React.MouseEventHandler<HTMLElement>;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const List = ({
  users,
  isCheckedUsers = false,
  withButton,
  withCheckbox,
  withProfile,
  onUserClick,
  onButtonClick,
}: ListProps) => {
  const { checkedUsers, selectedUser } = useAppSelector(
    (state) => state,
    shallowEqual,
  );
  const listRef = useRef<HTMLUListElement>(null);

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
        <ListItemHeader withCheckbox={withCheckbox} withProfile={withProfile}>
          <h4>이름</h4>
          <h4>생년월일</h4>
        </ListItemHeader>
      </ListHeader>
      <ListBody ref={listRef} withButton={withButton}>
        {users.map(({ id, name, date, checked }, index) => (
          <React.Fragment key={id}>
            <ListItem
              id={id}
              name={name}
              date={date}
              checked={checked}
              selected={selectedUser && id === selectedUser.id}
              withCheckbox={withCheckbox}
              onClick={onUserClick}
            />
            {index !== users.length - 1 && <DivisionLine />}
          </React.Fragment>
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
  border-radius: 3px 3px 0 0;
  background-color: ${({ theme }) => theme.colors.lavender_50};
  line-height: 1.267;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: 49px;
    background-color: ${({ theme, withProfile }) =>
      withProfile && theme.colors.purple_60};
  }
`;

const ListItemHeader = styled.div<
  Pick<ListProps, 'withCheckbox' | 'withProfile'>
>`
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

    h4 {
      color: ${({ theme, withProfile }) =>
        withProfile ? theme.colors.white : theme.colors.black};
    }
  }
`;

const ListBody = styled.ul<Pick<ListProps, 'withButton'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ withButton }) =>
    withButton ? 'calc(100% - 178px)' : 'calc(100% - 93px)'};
  margin: 0;
  border-radius: 0 0 3px 3px;
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
