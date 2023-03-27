import { Input, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import UpdateAvatar from './UpdateAvatar';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import UpdateBackgroundProfile from './UpdateBackgroundProfile';

const { TextArea } = Input;

interface UpdateProfileFormProps {
  username: string;
  avatar?: string;
  bio?: string;
  background_profile?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangePicture: (key: string, val: string) => void;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = (props) => {
  const { handleChange, handleChangePicture } = props;
  return (
    <div>
      <Inline>
        <UpdateAvatar image={props.avatar} handleChangePicture={handleChangePicture} />
        <UpdateBackgroundProfile
          image={props.background_profile}
          handleChangePicture={handleChangePicture}
        />
      </Inline>
      <Flex>
        <Input
          placeholder='Username'
          prefix={<UserOutlined />}
          suffix={
            <Tooltip title='username when you login next time'>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          name='username'
          onChange={handleChange}
          value={props.username}
        />
        <TextArea
          rows={4}
          placeholder='Bio'
          maxLength={200}
          onChange={handleChange}
          name='bio'
          value={props.bio}
        />
      </Flex>
    </div>
  );
};

export default UpdateProfileForm;

const Inline = styled.div`
  display: inline-flex;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
