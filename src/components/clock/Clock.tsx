import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ClockProps {
  interval?: number;
  includeSecond?: boolean;
}

const Clock = ({ interval = 1000, includeSecond = false }: ClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <Time>
      {time.getHours()}:{time.getMinutes()}
      {includeSecond && `:${String(time.getSeconds()).padStart(2, '0')}`}
    </Time>
  );
};

const Time = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export default Clock;
