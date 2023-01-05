import axios from 'axios';

export const request = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    const error = e as Error;
    throw new Error(`API 요청 실패. ${error.message}`);
  }
};
