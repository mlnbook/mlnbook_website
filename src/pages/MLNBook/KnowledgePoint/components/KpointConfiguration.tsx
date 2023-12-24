import React, { useEffect } from 'react';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { PicBookGradeOptions, PicBookLanguageLevelOptions, PicBookLanguageOptions, PicBookPhaseOptions } from '../../constant';
import { addknowledge, updateKnowledge } from '@/services/mlnbook/knowledge_api';
import { generateMD5 } from '../../utils';

/**
 * 知识点编辑、配置模块
 * @param props
 * @returns
 */
const KpointConfiguraton: React.FC = (props) => {
  // 用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const { record, setShowModal, showModal, actionRef } = props

  const initParams = record.id? record:{
    language: 'en_US',
    language_level: 'A1',
    phase: 'preschool',
    grade: 'age1-preschool',
    pic_style: 'realistic'
  }
  return <ModalForm
    title={record?.id ? `编辑知识点:${record?.id}`: '新建知识点'}
    width="600px"
    layout="horizontal"
    visible={showModal}
    initialValues={initParams}
    onVisibleChange={setShowModal}
    onFinish={async (value) => {
      let result;
      value['user'] = currentUser?.user
      if(record?.id){
        value['id'] = record?.id
        result = await updateKnowledge(value)
      }
      else{
        value['knowledge_uniq'] = generateMD5(value['knowledge'])
        console.log(value)
        result = await addknowledge(value)
      }
      if (result) {
        setShowModal(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    }}
  >
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="知识点"
      name="knowledge"
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="语言"
      name="language"
      options={PicBookLanguageOptions}
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="语言级别"
      name="language_level"
      options={PicBookLanguageLevelOptions}
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="学段"
      name="phase"
      options={PicBookPhaseOptions}
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="年级"
      name="grade"
      options={PicBookGradeOptions}
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{span: 4}}
      width="md"
      label="图片风格"
      name="pic_style"
    />
  </ModalForm>
};

export default KpointConfiguraton;
