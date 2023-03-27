import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { beforeUpload } from '@helpers/uploadAvatar';

interface UpdateAvatarProps {
  image?: string;
  handleChangePicture: (key: string, val: string) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UpdateAvatar: React.FC<UpdateAvatarProps> = (props) => {
  const { handleChangePicture } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(props.image);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'avatar.png',
      status: 'done',
      url: props.image,
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length === 0) {
      handleChangePicture('avatar', '');
      return;
    }
    const base64file = await getBase64(newFileList[0].originFileObj as RcFile);
    handleChangePicture('avatar', base64file);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Avatar</div>
    </div>
  );
  return (
    <>
      <Upload
        listType='picture-card'
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
        accept='.png,.jpeg'
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel} title='Profile Avatar'>
        <img alt='avatar example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UpdateAvatar;
