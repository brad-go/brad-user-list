import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@/hooks';

const profileImageColor: { [key: string]: string } = {
  1: '#C1BAF2',
  2: '#E7D3D0',
  3: '#F0A8C2',
  4: '#F0A8C2',
  5: '#EEB692',
  6: '#7EEDD9',
  7: '#C1BAF2',
  8: '#7EEDD9',
  9: '#E7D3D0',
  10: '#E4D3D7',
  11: '#E4EFA5',
  12: '#E4EFA5',
  13: '#E4D3D7',
  14: '#F1B1E7',
};

interface ProfileProps {
  fullWidth?: boolean;
}

const Profile = ({ fullWidth }: ProfileProps) => {
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const getProfileImage = async () => {
      const image = await import(
        `@/assets/images/${selectedUser?.image || 'default.png'}`
      );
      setProfileImage(image.default);
    };

    getProfileImage();
  }, [selectedUser]);

  return (
    <Container fullWidth={fullWidth}>
      <ProfileBackground />
      <ProfileInfo>
        <ProfileImage imageNumber={selectedUser?.image.slice(0, 1)}>
          <img src={profileImage} alt={selectedUser?.name} />
        </ProfileImage>
        <ProfileContent>
          <ProfileContentItem>
            <span>이름</span>
            <span>{selectedUser?.name}</span>
          </ProfileContentItem>
          <ProfileContentItem>
            <span>생년월일</span>
            <span>{selectedUser?.date.replaceAll('-', '.')}</span>
          </ProfileContentItem>
          <ProfileContentItem>
            <span>한마디</span>
            <p>{selectedUser?.comment}</p>
          </ProfileContentItem>
        </ProfileContent>
      </ProfileInfo>
    </Container>
  );
};

const Container = styled.div<ProfileProps>`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '352px')};
  height: 425px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.breakPoints.mobile} {
    width: 100%;
  }
`;

const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 172px;
  border-radius: 3px 3px 0 0;
  background-color: ${({ theme }) => theme.colors.lavender_50};
`;

const ProfileInfo = styled.div`
  width: 302px;
`;

const ProfileImage = styled.div<{ imageNumber?: string }>`
  position: absolute;
  top: 40px;
  left: 50%;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: ${({ theme, imageNumber }) =>
    imageNumber ? profileImageColor[imageNumber] : theme.colors.white};
  box-shadow: 1px 5px 10px rgba(36, 26, 107, 0.15);
  transform: translateX(-50%);
  z-index: 10;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  @media ${({ theme }) => theme.breakPoints.mobile} {
    top: 30px;
  }
`;

const ProfileContent = styled.ul`
  width: 100%;
  height: calc(100% - 172px);
  margin: 0;
  margin-top: 172px;
  padding-top: 78px;
  border-radius: 0 0 3px 3px;

  @media ${({ theme }) => theme.breakPoints.mobile} {
    padding-top: 58px;
  }
`;

const ProfileContentItem = styled.li`
  display: grid;
  grid-template-columns: 90px 1fr;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.light};

  &:last-of-type {
    border-bottom: none;
  }

  & > span:first-of-type {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & > p {
    margin: 0;
    padding-right: 20px;
    word-break: keep-all;
    line-height: 1.2;
  }
`;

export default Profile;
