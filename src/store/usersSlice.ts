import type { User } from '@/types';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getUserList } from './usersActions';

interface UsersState {
  users: User[];
  checkedUsers: User[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  users: [],
  checkedUsers: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    checkUser(state, action: PayloadAction<User>) {
      const index = state.checkedUsers.findIndex(
        ({ id }) => id === action.payload.id,
      );

      if (index === -1) {
        return;
      }

      state.checkedUsers[index] = {
        ...state.users[index],
        checked: action.payload.checked,
      };
    },
    resetUsers(state) {
      state.checkedUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.checkedUsers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const { actions, reducer } = usersSlice;

export const { checkUser, resetUsers } = actions;

export default reducer;
