import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ProCard,
  ProForm, ProFormGroup,
  ProFormList,
  ProFormText,
  StepsForm
} from '@ant-design/pro-components';
import { Button, message, Space, Steps } from 'antd';
import { ProFormSelect, ProFormTextArea } from "@ant-design/pro-form";
import { PicBookGradeOptions, PicBookLanguageOptions, PicBookPhaseOptions } from "@/pages/MLNBook/constant";
import BookConfigComponent from "@/pages/MLNBook/PicBook/components/BookConfigComponent";
import ChapterConfigComponent from './components/ChapterConfigComponent';
import ParagraphConfigComponent from './components/ParagraphConfigComponent';

const PicBookConfigComponent: React.FC = (props) => {
  const { id } = props?.location?.query
  const [current, setCurrent] = useState(0)
  const [configId, setConfigId] = useState('')  // 配置绘本之后返回id
  const [configPageType, setCOnfigPageType] = useState('add')
  const [configData, setConfigData] = useState({})

  useEffect(() => {
    if (id) {
      setConfigId(id)
      setCOnfigPageType('edit')
    }
  }, [id])

  return (
    <PageContainer title={false}>
      <ProCard>
        <Steps current={current} onChange={(current) => { setCurrent(current) }}>
          <Steps.Step title='第一步' description='配置绘本'></Steps.Step>
          <Steps.Step title='第二步' description='配置章节' disabled={id ? false : true}></Steps.Step>
          <Steps.Step title='第三步' description='配置章节内容' disabled={id ? false : true}></Steps.Step>
        </Steps>
      </ProCard>
      {
        current == 0 ?
          <BookConfigComponent
            setCurrent={setCurrent}
            setConfigId={setConfigId}
            configId={configId}
            configData={configData}
            setConfigData={setConfigData}
          /> : null
      }
      {
        current == 1 ?
          <ChapterConfigComponent
            setCurrent={setCurrent}
            setConfigId={setConfigId}
            configId={configId}
            configData={configData}
            setConfigData={setConfigData}
          /> : null
      }
      {
        current == 2 ?
        <ParagraphConfigComponent
            setCurrent={setCurrent}
            setConfigId={setConfigId}
            configId={configId}
            configData={configData}
            setConfigData={setConfigData}
        />: null
      }
    </PageContainer>
  );
};

export default PicBookConfigComponent;
