import { useState } from 'react'
import { Radio } from 'antd';
import ProForm from '@ant-design/pro-form';
import './mobile.css'; // 引入样式文件
import { MobileSizeEnum } from '../constant';
import MobileComponent from './components/MobileComponent';

export default () => {
  // 机型选择
  const mobileSizeOptions = Object.entries(MobileSizeEnum).map(([label, value]) => ({
    label,
    value: label
  }));

  // 显示大小
  const [selectMobile, setSelectMobile] = useState('iPhone12Pro')

  const handleSizeChange = (e) => {
    const selectedValue = e.target.value;
    setSelectMobile(selectedValue);
  };
  return (
    // <div style={{ display: 'flex' }}>
      <div
        style={{ display: 'flex', flex: '0 0 100%', maxWidth: '100%' }}
      >
        <div className="mobile-screen-container">
          <ProForm.Item
            label="选择机型"
            style={{margin: '15px',}}
          >
            <Radio.Group onChange={handleSizeChange} defaultValue={selectMobile}>
              {mobileSizeOptions.map(option => (
                <Radio key={option.label} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </ProForm.Item>
          <div className="mobile-screen" style={{ height: MobileSizeEnum[selectMobile].height, width: MobileSizeEnum[selectMobile].width }}>
            {/* 通过移动端组件显示内容 */}
            <MobileComponent />
          </div>
        </div>
      </div>
  );
};
