import type { User } from '@/types';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { profileImageColor } from '@/constants/profile';

interface ProfileProps {
  user: User;
  fullWidth?: boolean;
}

const Profile = ({ user, fullWidth }: ProfileProps) => {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const getProfileImage = async () => {
      const image = await import(
        `@/assets/images/${user.image || 'default.png'}`
      );
      setProfileImage(image.default);
    };

    getProfileImage();
  }, [user]);

  return (
    <Container fullWidth={fullWidth}>
      <ProfileBackground />
      <ProfileInfo>
        <ProfileImage imageNumber={user.image.slice(0, 1)}>
          <img src={profileImage} alt={user.name} />
        </ProfileImage>
        <ProfileContent>
          <ProfileContentItem>
            <span>이름</span>
            <span>{user.name}</span>
          </ProfileContentItem>
          <ProfileContentItem>
            <span>생년월일</span>
            <span>{user.date.replaceAll('-', '.')}</span>
          </ProfileContentItem>
          <ProfileContentItem>
            <span>한마디</span>
            <p>{user.comment}</p>
          </ProfileContentItem>
        </ProfileContent>
      </ProfileInfo>
    </Container>
  );
};

const Container = styled.div<Pick<ProfileProps, 'fullWidth'>>`
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
