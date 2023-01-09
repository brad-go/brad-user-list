import type { RootState } from '@/store';

import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/globalStyle';
import { theme } from '@/styles/theme';
import { getUserList } from '@/store/usersActions';
import { useAppDispatch, useAppSelector } from '@/hooks';

import router from './router';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {error && <div>{error.message}</div>}
      {isLoading ? <div>Loading...</div> : <RouterProvider router={router} />}
    </ThemeProvider>
  );
};

export default App;
