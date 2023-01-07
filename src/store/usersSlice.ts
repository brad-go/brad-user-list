import type { User } from '@/types';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getUserList } from './usersActions';

interface UsersState {
  initialUsers: User[];
  users: User[];
  selectedUser: User | undefined;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  initialUsers: [],
  users: [],
  selectedUser: undefined,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    checkUser(state, action: PayloadAction<Pick<User, 'id'>>) {
      const index = state.users.findIndex(({ id }) => id === action.payload.id);

      if (index !== -1) {
        const current = state.users[index].checked;
        state.users[index].checked = !current;
      }
    },
    selectUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
    resetUsers(state) {
      state.users = state.initialUsers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.initialUsers = action.payload;
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const { actions, reducer } = usersSlice;

export const { checkUser, selectUser, setUsers, resetUsers } = actions;

export default reducer;
