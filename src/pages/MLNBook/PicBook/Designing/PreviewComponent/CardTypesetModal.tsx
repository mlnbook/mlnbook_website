/**
 * 根据传入的内容，布局，显示预览
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Space, Tag, message } from 'antd';
import { ModalForm, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { updateBookChapterTypeset } from '@/services/mlnbook/pic_book/page_api';


export const CardTypesetModal: React.FC = (props) => {
  const {
    typesetData,
    showTypesetModal,
    setShowTypesetModal,
    layoutOptionsData,
    refreshSelectTagFunc,
    updateChapterParaDataFunc,
    index = undefined
  } = props
  return <ModalForm
    title={index != undefined ? '编辑布局页面' : '新增布局页面'}
    width="500px"
    layout="horizontal"
    visible={showTypesetModal}
    onVisibleChange={setShowTypesetModal}
    initialValues={index != undefined ? { layout: typesetData?.setting?.[index] } : {}}
    onFinish={async (value) => {
      let params = {
        id: typesetData?.id,
        setting: typesetData?.setting
      }
      // 新增流程
      if (index == undefined) {
        params['setting'].push(value?.layout)
      }
      else {
        params.setting[index] = value?.layout
      }
      const result = await updateBookChapterTypeset(params)
      setShowTypesetModal(false)
      if (result?.id) {
        // // 刷新选中的段落
        await updateChapterParaDataFunc()
        // 刷新选中的内容
        refreshSelectTagFunc()
      }
      else {
        message.error('添加失败')
      }
    }}
  >
    <ProFormSelect
      rules={[{ required: true }]}
      labelCol={{ span: 4 }}
      width="md"
      label="页面模板"
      name="layout"
      options={layoutOptionsData}
    />
  </ModalForm>

};
export default CardTypesetModal;
