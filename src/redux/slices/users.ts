import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

import { createSlice } from '@reduxjs/toolkit';

const initialState: User[] = [];

const users = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUsers(state, action: PayloadAction<User>) {
      return [...state, action.payload];
    },
    selectUser(state, action: PayloadAction<User>) {
      const selected = state.find((user) => user.id === action.payload.id);

      if (selected) {
        selected.checked = !selected.checked;
      }
    },
    resetUsers() {
      return initialState;
    },
  },
});

export const { addUsers, selectUser, resetUsers } = users.actions;

export default users;
