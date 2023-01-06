import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserList } from '@/store/usersActions';

import UserList from './UserList';

export default {
  title: 'components/userList',
  component: UserList,
} as ComponentMeta<typeof UserList>;

const UserListTemplate: ComponentStory<typeof UserList> = ({ ...args }) => {
  const users = useAppSelector((state) => state.currentUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return <UserList {...args} users={users} />;
};

export const UserListDefault = UserListTemplate.bind({});
UserListDefault.args = {
  withCheckbox: false,
};

export const UserListDefaultMobile = UserListTemplate.bind({});
UserListDefault.args = {
  withCheckbox: false,
};
UserListDefaultMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const UserListWithCheckbox = UserListTemplate.bind({});
UserListWithCheckbox.args = {
  withCheckbox: true,
};

export const UserListWithCheckboxMobile = UserListTemplate.bind({});
UserListWithCheckboxMobile.args = {
  withCheckbox: true,
};
UserListWithCheckboxMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
