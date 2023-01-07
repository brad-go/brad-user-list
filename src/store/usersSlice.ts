import type { Order, User } from '@/types';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { orderByDate } from '@/utils/users';

import { getUserList } from './usersActions';

interface OrderOption {
  order: Order;
  isCheckedUsers: boolean;
}

interface UsersState {
  initialUsers: User[];
  users: User[];
  checkedUsers: User[];
  selectedUser: User | undefined;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UsersState = {
  initialUsers: [],
  users: [],
  checkedUsers: [],
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

      if (index === -1) {
        return;
      }

      const user = state.users[index];
      user.checked = !user.checked;

      if (user.checked) {
        state.checkedUsers = [
          user,
          ...state.checkedUsers.filter((u) => u.id !== user.id),
        ];
      } else {
        state.checkedUsers = state.checkedUsers.filter((u) => u.id !== user.id);
      }
    },
    selectUser(state, action: PayloadAction<Pick<User, 'id'>>) {
      const index = state.users.findIndex(({ id }) => id === action.payload.id);

      if (index !== -1) {
        state.selectedUser = state.users[index];
      }
    },
    orderUsers(state, action: PayloadAction<OrderOption>) {
      if (action.payload.isCheckedUsers) {
        const checkedUsers = [...state.checkedUsers];
        state.checkedUsers = orderByDate(checkedUsers, action.payload.order);
      } else {
        const users = [...state.users];
        state.users = orderByDate(users, action.payload.order);
      }
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
      state.checkedUsers = action.payload.filter((user) => user.checked);
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const { actions, reducer } = usersSlice;

export const { checkUser, selectUser, setUsers, orderUsers, resetUsers } =
  actions;

export default reducer;
