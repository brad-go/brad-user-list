import type { User } from '@/types';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getUserList } from './usersActions';

interface UsersState {
  users: User[];
  currentUsers: User[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  users: [],
  currentUsers: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.currentUsers = action.payload;
    },
    checkUser(state, action: PayloadAction<{ id: number }>) {
      const index = state.currentUsers.findIndex(
        ({ id }) => id === action.payload.id,
      );

      if (index !== -1) {
        const current = state.currentUsers[index].checked;
        state.currentUsers[index].checked = !current;
      }
    },
    resetUsers(state) {
      state.currentUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.currentUsers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const { actions, reducer } = usersSlice;

export const { checkUser, setUsers, resetUsers } = actions;

export default reducer;
