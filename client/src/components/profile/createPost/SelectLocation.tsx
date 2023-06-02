import { EnvironmentOutlined } from '@ant-design/icons';
import GetLocationAPI, { LocationResult } from '@api/GetLocation';
import useDebounce from '@hooks/useDebounce';
import { AutoComplete, Space } from 'antd';
import React, { useEffect, useState } from 'react';

interface SelectLocationProps {
  handleChange: (value: string) => void;
}

const SelectLocation: React.FC<SelectLocationProps> = (props) => {
  const [location, setLocation] = useState<string>('');
  const [locationData, setLocationData] = useState<{ value: string }[]>([]);
  const debouncedLocation = useDebounce(location, 500);

  useEffect(() => {
    async function getLocation() {
      const res = await GetLocationAPI(debouncedLocation);

      if (res.message.status.code === 200 && res.message.results.length > 0) {
        const locationResult = res.message.results.map((result: LocationResult) => {
          return { value: result.formatted };
        });

        setLocationData(locationResult);
      }
    }

    if (debouncedLocation) {
      getLocation();
    }
  }, [debouncedLocation]);

  const handleChange = (value: string) => {
    setLocation(value);
    props.handleChange(value);
  };

  return (
    <>
      <Space style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <AutoComplete
          placeholder='Location'
          bordered={false}
          options={locationData}
          onChange={handleChange}
          allowClear
          style={{ width: 320 }}
          dropdownAlign={{
            offset: [0, 0],
            overflow: {
              adjustX: 0,
              adjustY: 0, // do not auto flip in y-axis
            },
          }}
        />
        <EnvironmentOutlined />
      </Space>
    </>
  );
};

export default SelectLocation;
