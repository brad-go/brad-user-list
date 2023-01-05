import { combineReducers } from '@reduxjs/toolkit';

import users from './slices/users';

const reducer = combineReducers({
  reducer: users.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;

export default reducer;
