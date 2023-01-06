import type { User } from '@/types';

import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const BASE_URL = REACT_APP_API_URL || 'http://localhost:9000';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (e) {
    throw new Error(`API 요청 실패. ${(e as Error).message}`);
  }
};

export const updateUsers = async (users: User[]) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users`, { data: users });
    return response.data;
  } catch (e) {
    throw new Error(`API 요청 실패. ${(e as Error).message}`);
  }
};
