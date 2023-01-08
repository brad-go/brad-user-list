import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse,
} from 'react-router-dom';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  userError?: boolean;
}

const ErrorBoundary = ({ userError }: ErrorBoundaryProps) => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Owie>Oops!</Owie>
      <Phrase>
        {userError
          ? '찾고 계신 사용자가 없는 것 같습니다. 다른 사용자를 찾아보세요!'
          : '요청하신 페이지를 찾을 수 없습니다.'}
      </Phrase>
      {isRouteErrorResponse(error) && (
        <ErrorCode>Error Code: {error.status}</ErrorCode>
      )}
      {userError && <ErrorCode>Error Code: 404</ErrorCode>}
      <ButtonContainer>
        <Button onClick={handleGoBack}>뒤로가기</Button>
        <Button onClick={handleGoHome}>메인으로</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray_70};
`;

const Owie = styled.h1`
  margin: 16px 0;
  font-size: 120px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Phrase = styled.p`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ErrorCode = styled.p`
  margin: 12px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 36px;
  margin-top: 24px;
`;

const Button = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.purple_30};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_60};
  }
`;

export default ErrorBoundary;
