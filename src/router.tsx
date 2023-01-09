import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Home } from '@/pages/home';
import ErrorBoundary from '@/pages/ErrorBoundary';
import { User, UserDetail } from '@/pages/user';

import { Layout } from './components/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<Home />} />
      <Route errorElement={<ErrorBoundary userError />}>
        <Route path="/user" element={<User />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Route>
    </Route>,
  ),
);

export default router;
