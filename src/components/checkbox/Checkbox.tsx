import styled, { css } from 'styled-components';

import Check from '@/assets/svgs/check.svg';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => {
  return (
    <Container>
      <Box checked={checked} />
      <Check />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-flex;
  cursor: pointer;

  svg {
    position: absolute;
    top: 3px;
    left: 3px;
  }
`;

const Box = styled.div<{ checked: boolean }>`
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  outline: none;
  cursor: pointer;

  ${({ theme, checked }) => css`
    background-color: ${checked ? theme.colors.purple : theme.colors.white};
    transition: all 0.2s;
  `}
`;

export default Checkbox;
