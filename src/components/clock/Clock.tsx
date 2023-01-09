import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ClockProps {
  interval?: number;
}

const Clock = ({ interval = 1000 }: ClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <Time>
      {time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}
    </Time>
  );
};

const Time = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export default React.memo(Clock);
