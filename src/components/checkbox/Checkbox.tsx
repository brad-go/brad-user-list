import type { InputHTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

import Check from '@/assets/svgs/check.svg';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ id, checked, onChange, ...rest }: CheckboxProps) => {
  return (
    <Label htmlFor={id}>
      <Input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <Check />
    </Label>
  );
};

const Label = styled.label`
  position: relative;
  display: inline-flex;
  cursor: pointer;

  svg {
    position: absolute;
    top: 3px;
    left: 3px;
  }
`;

const Input = styled.input<{ checked: boolean }>`
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
