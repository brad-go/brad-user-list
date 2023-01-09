import React from 'react';
import styled, { css } from 'styled-components';

import { Checkbox } from '@/components';

interface ListItemState {
  checked: boolean;
  selected: boolean | undefined;
  withCheckbox?: boolean;
}

interface ListItemProps extends ListItemState {
  id: number;
  name: string;
  date: string;
  onClick: React.MouseEventHandler;
}

const ListItem = ({
  id,
  name,
  date,
  checked,
  selected,
  withCheckbox,
  onClick,
}: ListItemProps) => {
  return (
    <Item
      id={id.toString()}
      checked={checked}
      selected={selected}
      withCheckbox={withCheckbox}
      onClick={onClick}
    >
      <span>{name}</span>
      <span>{date.replaceAll('-', '.')}</span>
      <CheckboxContainer>
        {withCheckbox && <Checkbox checked={checked} />}
      </CheckboxContainer>
    </Item>
  );
};

const Item = styled.li<ListItemState>`
  position: relative;
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.267;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  span {
    color: ${({ theme, selected }) =>
      selected ? theme.colors.purple : theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  ${({ theme, withCheckbox, checked, selected }) =>
    withCheckbox
      ? css`
          grid-template-columns: 90px 108px 1fr;
          background-color: ${checked
            ? theme.colors.purple_30
            : theme.colors.white};
        `
      : css`
          background-color: ${selected
            ? theme.colors.purple_30
            : theme.colors.white};
        `}

  @media ${({ theme }) => theme.breakPoints.mobile} {
    grid-template-columns: 2fr 3fr;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    position: absolute;
    right: 54px;
  }
`;

export default React.memo(ListItem);
