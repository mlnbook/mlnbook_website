import React, { createRef, useEffect, useState } from 'react';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea, } from '@ant-design/pro-form';
import { PicBookGradeOptions, PicBookLanguageLevelOptions, PicBookLanguageOptions, PicBookPhaseOptions } from "@/pages/MLNBook/constant";
import { Button, Form, Space, Spin } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { picBookMeta, voiceTemplateList } from '@/services/mlnbook/picbook_api';


const BookConfigComponent: React.FC = (props) => {
  const [form] = Form.useForm();
  const formRef = createRef()
  // 用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [spining, setSpining] = useState(false)

  // 书籍基本信息
  const [picBookData, setPicBookData] = useState({})
  useEffect(async () => {
    if(props?.configId){
      setSpining(true)
      const result = await picBookMeta({ id: props?.configId })
      setPicBookData(result)
      form.setFieldsValue(result)
      setSpining(false)
    }
  }, [props?.configId])
  return (
    <ProCard>
      <Spin spinning={spining}>
        <ProForm
          form={form}
          labelCol={{ span: 2 }}
          layout='horizontal'
          formRef={formRef}
          initialValues={picBookData?.id ? picBookData: {
            language: 'en_US',
            language_level: 'A1',
            phase: 'preschool',
            grade: 'age1-preschool',
            voice_template: 1
          }}
          submitter={{
            render: (_, dom) => {
              return <div
                style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 20 }}
              >
                <Space>
                  <Button onClick={() => { console.log('下一步') }}>
                    下一步
                  </Button>
                  <Button type='primary' htmlType='submit'>保存并进行下一步</Button>
                </Space>
              </div>;
            },
          }}
          onFinish={async (values) => {
            console.log('点击了保存', values)
          }}
        >
          <ProFormText
            rules={[{ required: true }]}
            name="title"
            label="书名"
            placeholder={'输入绘本名称'}
          />
          <ProFormSelect
            label='语言'
            rules={[{ required: true }]}
            name="language"
            placeholder={'选择绘本语言'}
            options={PicBookLanguageOptions}
          />
          <ProFormSelect
            label='语言级别'
            rules={[{ required: true }]}
            name="language_level"
            placeholder={'选择绘本语言'}
            options={PicBookLanguageLevelOptions}
          />
          <ProFormSelect
            label='学段'
            rules={[{ required: true }]}
            name="phase"
            placeholder={'选择绘本学段'}
            options={PicBookPhaseOptions}
          />
          <ProFormSelect
            label='年级'
            rules={[{ required: true }]}
            name="phase"
            placeholder={'选择绘本年级'}
            options={PicBookGradeOptions}
          />
          <ProFormSelect
            label='声音模板'
            rules={[{ required: true }]}
            name="voice_template"
            placeholder={'选择绘本年级'}
            request={async () => {
              const result = await voiceTemplateList()
              const options = result?.map((item) => {
                return {
                  label: `${item.title}(${item.language}·${item.model_name}·${item.tts_model})`,
                  value: item.id
                }
              })
              return options
            }}
            options={PicBookGradeOptions}
          />
          {/* <ProFormSelect
          label='作者'
          rules={[{ required: true }]}
          name="author"
          placeholder={'选择作者'}
          options={PicBookGradeOptions}
        /> */}
          <ProFormTextArea
            // rules={[{required: true}]}
            name="description"
            label="描述"
          />
        </ProForm>
      </Spin>
    </ProCard>
  );
};

export default BookConfigComponent;
