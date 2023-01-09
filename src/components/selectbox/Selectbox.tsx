import type { Order } from '@/types';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Bracket from '@/assets/svgs/bracket.svg';
import { useAppDispatch, useDrawer } from '@/hooks';
import { orderUsers } from '@/store/usersSlice';

interface Option {
  order: Order;
  name: string;
}

const options: Option[] = [
  { order: 'ascending', name: '오름차 순' },
  { order: 'descending', name: '내림차 순' },
];

interface SelectboxProps {
  isCheckedUsers: boolean;
}

const Selectbox = ({ isCheckedUsers }: SelectboxProps) => {
  const dispatch = useAppDispatch();

  const drawerRef = useRef(null);
  const [option, setOption] = useState(options[0]);
  const [isOpen, toggleSelectbox] = useDrawer(drawerRef);

  const handleClickOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const { id, innerText } = e.currentTarget as HTMLElement;
    const order = id as Order;

    setOption({ order, name: innerText });
    toggleSelectbox();
    dispatch(orderUsers({ order, isCheckedUsers }));
  };

  return (
    <div ref={drawerRef}>
      <Select onClick={toggleSelectbox}>
        <span>{option.name}</span>
        <Bracket />
      </Select>
      <OptionList isOpen={isOpen}>
        {options.map(({ order, name }) => (
          <OptionItem
            id={order}
            key={order}
            isSelected={name === option.name}
            onClick={handleClickOption}
          >
            {name}
          </OptionItem>
        ))}
      </OptionList>
    </div>
  );
};

const Select = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 82px;
  padding: 5px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.267;
  z-index: 100;
  cursor: pointer;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    top: 10px;
    left: auto;
    right: 20px;
  }
`;

const OptionList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 44px;
  left: 20px;
  width: 82px;
  max-height: ${({ isOpen }) => (isOpen ? 200 : 0)}px;
  margin: 0;
  border-radius: 0px 0px 5px 5px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.15);
  transition: max-height 0.2s ease-in-out;
  overflow: hidden;
  z-index: 50;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    top: 34px;
    left: auto;
    right: 20px;
  }
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme, isSelected }) =>
    isSelected && theme.colors.purple_40};
  color: ${({ theme, isSelected }) => isSelected && theme.colors.purple};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.267;
  cursor: pointer;

  &:first-of-type {
    padding: 9px 0 4px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  &:last-of-type {
    padding: 4px 0 5px 0;
  }
`;

export default Selectbox;
