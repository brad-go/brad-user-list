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
      <span>{date}</span>
      {withCheckbox && <Checkbox checked={checked} />}
    </Item>
  );
};

const Item = styled.li<ListItemState>`
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.27;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  span {
    color: ${({ theme, selected }) =>
      selected ? theme.colors.purple : theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    grid-template-columns: ${({ withCheckbox }) =>
      withCheckbox ? '124px 141px 1fr' : '124px 1fr'};
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
`;

export default ListItem;
