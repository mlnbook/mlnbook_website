import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard } from '@ant-design/pro-components';
import { Steps } from 'antd';

import BookConfigComponent from "@/pages/MLNBook/PicBook/components/BookConfigComponent";
import BookContentConfigComponent from './components/BookContentComponent';

const PicBookConfigComponent: React.FC = (props) => {
  const { id } = props?.location?.query
  const [current, setCurrent] = useState(0)
  const [picBookId, setPicBookId] = useState('')  // 配置绘本之后返回id
  const [configData, setConfigData] = useState({})

  useEffect(() => {
    if (id) {
      setPicBookId(id)
    }
  }, [id])

  return (
    <PageContainer title={false} pageHeaderRender={false}>
      <ProCard>
        <Steps current={current} onChange={(current) => { setCurrent(current) }}>
          <Steps.Step title='第一步' description='配置绘本'></Steps.Step>
          <Steps.Step title='第二步' description='配置内容' disabled={id ? false : true}></Steps.Step>
        </Steps>
      </ProCard>
      {
        current == 0 ?
          <BookConfigComponent
            setCurrent={setCurrent}
            picBookId={picBookId}
            setPicBookId={setPicBookId}
            setConfigData={setConfigData}
          /> : null
      }
      {
        current == 1 ?
          <BookContentConfigComponent
            picBookId={picBookId}
            configData={configData}
            setConfigData={setConfigData}
          /> : null
      }
    </PageContainer>
  );
};

export default PicBookConfigComponent;
