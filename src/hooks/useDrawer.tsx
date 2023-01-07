import { useEffect, useCallback } from 'react';

import useToggle from './useToggle';

const useDrawer = <T extends HTMLElement>(
  drawerRef: React.RefObject<T>,
): [boolean, () => void] => {
  const [isOpen, toggleDrawer] = useToggle(false);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as HTMLElement)
      ) {
        toggleDrawer();
      }
    },
    [drawerRef, isOpen, toggleDrawer],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef, isOpen, toggleDrawer, handleClickOutside]);

  return [isOpen, toggleDrawer];
};

export default useDrawer;
