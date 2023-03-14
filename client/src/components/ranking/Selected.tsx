import React, { useState } from 'react';
import { Segmented, Select } from 'antd';
import styled from 'styled-components';
import { ScreenSize } from '@common/ScreenSize';

const Selected: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>('24h');
  const BtnData = ['24h', '7d', '30d', 'all'];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Box>
      <Select
        placeholder='Select a collection'
        style={{ width: 200, fontWeight: 600, fontSize: '4rem' }}
        size='large'
        onChange={handleChange}
        dropdownStyle={{ fontWeight: 600 }}
        options={[
          { value: 'all', label: 'All Collection' },
          { value: 'rolex', label: 'Rolex' },
          { value: 'patek philippe', label: 'Patek Philippe' },
          { value: 'richard mille', label: 'Richard Mille' },
          { value: 'denial wellington', label: 'Denial Wellington' },
        ]}
      />
      <Segment
        options={BtnData}
        value={radioValue}
        onChange={(value) => setRadioValue(value.toLocaleString())}
        size='large'
      />
    </Box>
  );
};

export default Selected;

const Box = styled.div`
  display: flex;
  padding: 2rem 0;
  justify-content: space-between;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const Segment = styled(Segmented)`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
