import type { User } from '@/types';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUsers, updateUsers } from '@/services/users';

export const getUserList = createAsyncThunk<User[]>(
  '/users/getUsers',
  async () => {
    const response = await getUsers();
    return response.data;
  },
);

export const updateUserList = createAsyncThunk<void, User[]>(
  '/users/updateUsers',
  async (users) => {
    const response = await updateUsers(users);
    return response.data;
  },
);
