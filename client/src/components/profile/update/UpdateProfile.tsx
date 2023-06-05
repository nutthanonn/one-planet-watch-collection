import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingOutlined } from '@ant-design/icons';
import UpdateProfileForm from './UpdateProfileForm';
import ConfirmPassword from './ConfirmPassword';
import { Button, message, Modal, Steps, Tooltip } from 'antd';
import { UpdateUserProfileAPI } from '@api/UpdateUserProfile';

interface UpdateProfileProps {
  username: string;
  avatar?: string;
  bio?: string;
  background_profile?: string;
}

const UpdateProfile: React.FC<UpdateProfileProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [userForm, setUserForm] = useState<UpdateProfileProps>({
    username: props.username,
    avatar: props.avatar,
    bio: props.bio,
    background_profile: props.background_profile,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleChangePicture = (key: string, val: string) => {
    switch (key) {
      case 'avatar':
        setUserForm({ ...userForm, avatar: val });
        break;
      case 'background':
        setUserForm({ ...userForm, background_profile: val });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = {
      ...userForm,
    };

    const res = await UpdateUserProfileAPI({ ...form, password });

    if (res.error === false) {
      setIsModalOpen(false);
    } else {
      message.error('Update profile failed!');
      setPasswordErr(true);
    }
  };

  const steps = [
    {
      title: 'Update Profile',
      content: (
        <UpdateProfileForm
          {...userForm}
          handleChange={handleChange}
          handleChangePicture={handleChangePicture}
        />
      ),
    },
    {
      title: 'Password',
      content: (
        <ConfirmPassword password={password} setPassword={setPassword} error={passwordErr} />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 16,
  };

  return (
    <>
      <Tooltip placement='top' title='setting'>
        <SettingIcon onClick={() => setIsModalOpen(true)} />
      </Tooltip>
      <Modal
        title='Setting profile'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={() => setCurrent(current + 1)}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={handleSubmit}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UpdateProfile;

const SettingIcon = styled(SettingOutlined)`
  font-size: 25px;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  transition: all 0.1s ease-in-out;
`;
