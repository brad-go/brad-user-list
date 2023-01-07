import type { User, Order } from '@/types';

export const orderUsersByDate = (users: User[], order: Order) => {
  const sortedUsers = [...users];

  return sortedUsers.sort((a, b): number => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    if (timeA === timeB) {
      return a.name > b.name ? 1 : -1;
    }

    return order === 'ascending' ? timeA - timeB : timeB - timeA;
  });
};
