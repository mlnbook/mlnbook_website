import React from 'react';
import { ModalForm, ProFormGroup, ProFormSelect, ProFormText, ProFormTextArea, } from '@ant-design/pro-form';
import { addLayout, updateLayout } from '@/services/mlnbook/layout_api';
import { ProFormColorPicker, ProFormUploadButton } from '@ant-design/pro-components';
import { voiceTemplateList } from '@/services/mlnbook/pic_book/api';
import { addPicBookVoiceRelation } from '@/services/mlnbook/pic_book/voice_api';
import { message } from 'antd';

/**
 * 知识点编辑、配置模块
 * @param props
 * @returns
 */
const VoiceRelationModal: React.FC = (props) => {
  const { setShowModal, showModal, updateVoiceListFunc, picBookId } = props

  return <ModalForm
    title={'添加绘本语音模板'}
    width="750px"
    layout="horizontal"
    visible={showModal}
    onVisibleChange={setShowModal}
    onFinish={async (values) => {
      const params = {
        pic_book: picBookId,
        voice_template: values['voice_template']
      }
      const result = await addPicBookVoiceRelation(params)
      if(result?.id){
        setShowModal(false)
        await updateVoiceListFunc()
      }
      else{
        message.error('添加失败')
      }
      console.log(values)
    }}
  >
    <ProFormSelect
      label='声音模板'
      rules={[{ required: true }]}
      name="voice_template"
      mode='single'
      placeholder={'选择声音模板'}
      request={async () => {
        const result = await voiceTemplateList()
        const options = result?.map((item) => {
          return {
            label: `${item.title}(${item.language}·${item.tts_model})`,
            value: item.id
          }
        })
        return options
      }}
    />
  </ModalForm>
};

export default VoiceRelationModal;
