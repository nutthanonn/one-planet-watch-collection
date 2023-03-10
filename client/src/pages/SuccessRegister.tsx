import { InboxOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';
import { H1, H6 } from '@common/Typography';
import React from 'react';
import styled from 'styled-components';

const SuccessRegister: React.FC = () => {
  return (
    <Center>
      <H1_Custom>Successful</H1_Custom>
      <H6_Custom>Please verify your account</H6_Custom>
      <Paragraph>
        Account activation link has been send to e-mail <br />
        address you provided
      </Paragraph>
      <InboxOutlined style={{ fontSize: '10rem', padding: '2rem 0', cursor: 'pointer' }} />
      <div>
        <Paragraph>
          If you don&apos;t see the email, please check your spam folder or <br />
          <br />
          <Link href=''>resend the email</Link>
        </Paragraph>
      </div>
    </Center>
  );
};

export default SuccessRegister;

const Center = styled.section`
  display: flex;
  align-items: center;
  height: 85vh;
  flex-direction: column;
  opacity: 0.8;
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
`;

const H1_Custom = styled(H1)`
  font-size: 5rem;
  padding-bottom: 2rem;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 3rem;
  }
`;

const H6_Custom = styled(H6)`
  font-size: 2.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  padding-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
`;

const Link = styled.a`
  padding: 1rem 0;
  color: #1890ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
