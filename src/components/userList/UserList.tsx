import type { Order, User } from '@/types';

import styled from 'styled-components';

import { checkUser, setUsers } from '@/store/usersSlice';
import { useAppDispatch } from '@/hooks';
import { Checkbox, Selectbox } from '@/components';
import { sortUsers } from '@/utils/users';

interface UserItemProps {
  checked: boolean;
  withCheckbox: boolean | undefined;
}

interface UserListProps {
  users: User[];
  withCheckbox?: boolean;
}

const UserList = ({ users, withCheckbox }: UserListProps) => {
  const dispatch = useAppDispatch();

  const handleClick = (user: User) => {
    if (!withCheckbox) {
      return;
    }

    dispatch(checkUser({ id: user.id }));
  };

  const handleSortUsers = (order: Order) => {
    const sorted = sortUsers(users, order);
    dispatch(setUsers(sorted));
  };

  return (
    <Container>
      <ListHeader>
        <Selectbox handleSortUsers={handleSortUsers} />
        <ListItemHeader withCheckbox={withCheckbox}>
          <h4>이름</h4>
          <h4>생년월일</h4>
        </ListItemHeader>
      </ListHeader>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            checked={user.checked}
            withCheckbox={withCheckbox}
            onClick={() => handleClick(user)}
          >
            <span>{user.name}</span>
            <span>{user.date}</span>
            {withCheckbox && <Checkbox checked={user.checked} />}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: 250px;
  height: 490px;
  border-radius: 3px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    width: 353px;
    height: 293px;
  }
`;

const ListHeader = styled.div`
  position: relative;
  width: 100%;
  height: 93px;
  background-color: ${({ theme }) => theme.colors.lavender_50};
  line-height: 1.275;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: 49px;
  }
`;

const ListItemHeader = styled.div<Partial<UserItemProps>>`
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
    grid-template-columns: 124px auto;
    height: 100%;
    padding-top: 0;
  }
`;

const List = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.white};
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

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
`;

const ListItem = styled.li<UserItemProps>`
  display: grid;
  grid-template-columns: ${({ withCheckbox }) =>
    withCheckbox ? '90px 108px auto' : '110px auto'};
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.purple_30 : theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.27;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  span {
    color: ${({ theme, checked }) =>
      checked ? theme.colors.purple : theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    transition: color 0.2s ease-in-out;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    grid-template-columns: ${({ withCheckbox }) =>
      withCheckbox ? '124px 141px auto' : '124px auto'};
  }
`;

export default UserList;
