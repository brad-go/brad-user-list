import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Home } from '@/pages/home';
import { User, UserDetail } from '@/pages/user';

import { Layout } from './components/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route>
        <Route path="/user" element={<User />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Route>
    </Route>,
  ),
);

export default router;
