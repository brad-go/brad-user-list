import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { Order } from '@/types';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserList } from '@/store/usersActions';
import { setUsers, checkUser, selectUser } from '@/store/usersSlice';
import { sortUsers } from '@/utils/users';

import List from './List';

export default {
  title: 'components/list',
  component: List,
} as ComponentMeta<typeof List>;

const ListTemplate: ComponentStory<typeof List> = ({ ...args }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  const handleClickUser = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const id = Number(target.id);

    dispatch(checkUser({ id }));
    dispatch(selectUser(users[id - 1]));
  };

  const handleSortUsers = (order: Order) => {
    const sorted = sortUsers(users, order);
    dispatch(setUsers(sorted));
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <List
      {...args}
      users={users}
      onUserClick={handleClickUser}
      handleSortUsers={handleSortUsers}
    />
  );
};

export const ListDefault = ListTemplate.bind({});

export const ListDefaultMobile = ListTemplate.bind({});
ListDefaultMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const ListWithCheckbox = ListTemplate.bind({});
ListWithCheckbox.args = {
  withCheckbox: true,
};

export const ListWithCheckboxMobile = ListTemplate.bind({});
ListWithCheckboxMobile.args = {
  withCheckbox: true,
};
ListWithCheckboxMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const ListWithButton = ListTemplate.bind({});
ListWithButton.args = {
  withButton: true,
};

export const ListWithButtonMobile = ListTemplate.bind({});
ListWithButtonMobile.args = {
  withButton: true,
};
ListWithButtonMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
