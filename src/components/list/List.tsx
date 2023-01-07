import type { User, Order } from '@/types';

import styled from 'styled-components';

import { Selectbox } from '@/components';
import { useAppSelector } from '@/hooks';

import ListItem from './ListItem';

interface ListProps {
  users: User[];
  withButton?: boolean;
  withCheckbox?: boolean;
  onUserClick: React.MouseEventHandler;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  handleSortUsers: (order: Order) => void;
}

const List = ({
  users,
  withButton,
  withCheckbox,
  onUserClick,
  onButtonClick,
  handleSortUsers,
}: ListProps) => {
  const selected = useAppSelector((state) => state.selectedUser);

  return (
    <Container>
      <ListHeader>
        <Selectbox handleSortUsers={handleSortUsers} />
        <ListItemHeader withCheckbox={withCheckbox}>
          <h4>이름</h4>
          <h4>생년월일</h4>
        </ListItemHeader>
      </ListHeader>
      <ListBody withButton={withButton}>
        {users.map(({ id, name, date, checked }) => (
          <ListItem
            key={id}
            id={id}
            name={name}
            date={date}
            checked={checked}
            selected={selected && id === selected.id}
            withCheckbox={withCheckbox}
            onClick={onUserClick}
          />
        ))}
      </ListBody>
      {withButton && (
        <ButtonContainer>
          <Button type="button" onClick={onButtonClick}>
            저장하기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListHeader = styled.div`
  position: relative;
  width: 100%;
  height: 93px;
  background-color: ${({ theme }) => theme.colors.lavender_50};
  line-height: 1.275;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    height: 49px;
  }
`;

const ListItemHeader = styled.div<{ withCheckbox: boolean | undefined }>`
  display: grid;
  grid-template-columns: ${({ withCheckbox }) =>
    withCheckbox ? '90px 1fr' : '110px 1fr'};
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 20px;
  padding-top: 64px;

  h4 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    grid-template-columns: 124px auto;
    height: 100%;
    padding-top: 0;
  }
`;

const ListBody = styled.ul<{ withButton: boolean | undefined }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding-bottom: ${({ withButton }) => withButton && '85px'};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 5px;
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 25px 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.275;

  &:hover {
    background-image: linear-gradient(rgb(0 0 0 / 5%) 0 0);
  }

  &:active {
    background-image: linear-gradient(rgb(255 255 255 / 5%) 0 0);
  }
`;

export default List;
