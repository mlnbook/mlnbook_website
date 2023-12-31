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
import { addLayout, updateLayout } from '@/services/mlnbook/layout_api';
import { ProFormColorPicker, ProFormUploadButton } from '@ant-design/pro-components';

/**
 * 知识点编辑、配置模块
 * @param props
 * @returns
 */
const LayoutConfiguraton: React.FC = (props) => {
  const { record, setShowModal, showModal, actionRef } = props

  if (record?.background_img) {
    record['background_img'] = [
      {
        url: record?.background_img
      }
    ]
  }

  const initParams = record.id ? record : {
    c_type: 'protected',
    grid_row_col: '[[24]]',
    grid_gutter: '[16, 24]',
    font_color: '#0000E0',
    font_family: 'Arial',
    font_size: 14,
    background_color: '#FFFFFF',
    text_flex_justify: 'flex-end',
    text_flex_align: 'flex-end',
    text_opacity: 1
  }
  return <ModalForm
    title={record?.id ? `编辑页面模板:${record?.id}` : '新建页面模板'}
    width="600px"
    layout="horizontal"
    visible={showModal}
    initialValues={initParams}
    onVisibleChange={setShowModal}
    onFinish={async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        // 如果字段的值是一个文件列表（如图片上传），则需要特殊处理
        if (key === 'background_img') {
          if(values[key][0].originFileObj){
            formData.append(key, values[key][0].originFileObj);
          }
        }
        else {
          formData.append(key, values[key]);
        }
      });

      let result;
      if (record?.id) {
        formData.append('id', record?.id)
        result = await updateLayout(record?.id, formData)
      }
      else {
        result = await addLayout(formData)
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
      labelCol={{ span: 4 }}
      width="md"
      label="标题"
      name="title"
    />
    <ProFormTextArea
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="描述"
      name="description"
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="类型"
      name="c_type"
      options={[
        { label: '完全公开', value: 'public' },
        { label: '内部使用', value: 'protected' },
        { label: '私有', value: 'private' }
      ]}
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="栅格布局"
      name="grid_row_col"
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="栅格间距"
      name="grid_gutter"
    />
    <ProFormColorPicker
      label="字体颜色"
      labelCol={{ span: 4 }}
      width="md"
      rules={[{ required: true }]}
      name="font_color"
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="字体"
      name="font_family"
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="字体大小"
      name="font_size"
    />
    <ProFormUploadButton
      name='background_img'
      label='背景图'
      max={1}
      labelCol={{ span: 4 }}
      fieldProps={{
        data: {},
        defaultFileList: [],
        multiple: false,
        listType: 'picture-card',
        accept: '.png,.jpg,.jpeg',
        maxCount: 1,
      }}
      extra='支持 JPG、PNG 格式'
    />
    <ProFormColorPicker
      label="背景颜色"
      labelCol={{ span: 4 }}
      width="md"
      rules={[{ required: true }]}
      name="background_color"
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{ span: 5 }}
      width="md"
      label="文本主轴位置"
      name="text_flex_justify"
      options={[
        { label: 'flex-start', value: 'flex-start' },
        { label: 'center', value: 'center' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-around', value: 'space-around' },
        { label: 'space-evenly', value: 'space-evenly' },
      ]}
    />
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{ span: 5 }}
      width="md"
      label="文本交叉轴位置"
      name="text_flex_align"
      options={[
        { label: 'flex-start', value: 'flex-start' },
        { label: 'center', value: 'center' },
        { label: 'flex-end', value: 'flex-end' }
      ]}
    />
    <ProFormText
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="文本透明度"
      name="text_opacity"
    />
  </ModalForm>
};

export default LayoutConfiguraton;
