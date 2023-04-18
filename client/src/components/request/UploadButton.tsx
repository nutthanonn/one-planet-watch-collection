import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';

interface UploadButtonProps {
  HandleChangeImage: (val: string) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadButton: React.FC<UploadButtonProps> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileSave, setFileSave] = useState<string[]>([]);

  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    if (newFileList[0].originFileObj) {
      await getBase64(newFileList[0].originFileObj as RcFile).then((base64) => {
        props.HandleChangeImage(base64);
        setFileSave([...fileSave, base64]);
      });
    }

    setFileList(newFileList);
  };

  return (
    <Upload
      accept='.png,.jpeg'
      onChange={onChange}
      beforeUpload={() => false}
      fileList={fileList}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (max 1)</Button>
    </Upload>
  );
};

export default UploadButton;
