import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Popconfirm, Space, Spin, TreeSelect, Upload, message } from 'antd';
import { DragSortTable, ModalForm, ProCard, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { addBookPage, addPicBook, authorList, deleteChapter, picBookChapterMeta, picBookMeta, updatePicBook, voiceTemplateList } from '@/services/mlnbook/pic_book/api';
import { MenuOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ChapterModal from './old/ChapterModal';
import { addBookChapter, fetchBookPageParagraphMeta, picBookChapterMenuMeta, updateBookChapter, updateChapterParagraphSeq } from '@/services/mlnbook/pic_book/page_api';
import { formatMenuValue } from './utils';
import { ProFormSelect } from '@ant-design/pro-form';


const BookDirectionModal: React.FC = (props) => {
  const actionRef = useRef()
  // 提取参数
  const { setShowMenuModal, showMenuModal, setEditMenu, editMenu, picBookId, layoutOptionsData, layoutOriginData, refreshMenu } = props
  // 新建章节、页面
  const [addType, updateAddType] = useState('chapter')
  // 分组父菜单
  const [unLeafMenu, updateUnLeafMenu] = useState(async () => {
    const result = await picBookChapterMenuMeta({ id: picBookId })
    // 添加目录的value字段
    formatMenuValue(result)
    let withDefault = Object.assign([], result);
    withDefault.unshift({ key: '0-0', title: '无父分组', value: '0-0' })
    updateUnLeafMenu({
      withDefault: withDefault,
      unDefault: result
    })
  })
  return <ModalForm
    title={editMenu?.title == undefined ? "新建章节/页面" : "修改章节"}
    width="600px"
    layout="horizontal"
    visible={showMenuModal}
    onVisibleChange={setShowMenuModal}
    onFinish={async (value) => {
      console.log(value)
      let params;
      let success;
      // 新增逻辑
      if (editMenu?.title == undefined) {
        if (addType == 'chapter') {
          params = {
            pic_book: picBookId,
            title: value?.title,
            parent: typeof value?.parent == 'number' ? value?.parent : null
          }
          success = await addBookChapter(params)
        }
        else if (addType == 'page') {
          params = {
            title: value?.title,
            chapter: value?.chapter,
            paragraphs: [],
            pic_book: picBookId,
            layout: value?.layout
          }
          success = await addBookPage(params)
        }
      }
      // 编辑逻辑，暂时只能编辑章节
      else {
        params = {
          id: editMenu?.key,
          title: value?.title,
          parent: typeof value?.parent == 'number' ? value?.parent : null
        }
        success = await updateBookChapter(params)
      }
      if (success?.id) {
        setShowMenuModal(false)
        await refreshMenu()
      }
      else {
        message.error('处理失败')
      }
    }}
    modalProps={{
      closable: false
    }}
  >
    {/* 新建 */}
    {editMenu?.title == undefined && (
      <ProFormRadio.Group
        name='add_type'
        label='新建类型'
        initialValue={addType}
        labelCol={{ span: 4 }}
        rules={[{ required: true }]}
        options={[
          { label: '章节', value: 'chapter' },
          { label: '页面', value: 'page' },
        ]}
        fieldProps={{
          onChange: (value) => {
            updateAddType(value?.target?.value)
          }
        }}
      />
    )}
    {addType == 'chapter' && (
      <>
        <ProFormText
          width={"md"}
          name="title"
          label="章节名称"
          labelCol={{ span: 4 }}
          initialValue={editMenu?.title || ""}
          rules={[{ required: true }]}
        />
        <ProForm.Item
          label={"父章节"}
          name={'parent'}
          labelCol={{ span: 4 }}
          initialValue={editMenu?.parent || "0-0"}
          rules={[{ required: true }]}
        >
          <TreeSelect
            showSearch
            style={{ width: 330 }}
            treeNodeFilterProp='title'
            treeData={Object.keys(unLeafMenu).length > 0 ? unLeafMenu?.withDefault : []}
          />
        </ProForm.Item>
      </>
    )}
    {
      addType == 'page' && (
        <>
          <ProFormSelect
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
            width="md"
            label="页面模板"
            name="layout"
            options={layoutOptionsData}
          />
          <ProForm.Item
            label={"所属章节"}
            name={'chapter'}
            labelCol={{ span: 4 }}
            initialValue={editMenu?.parent || undefined}
            rules={[{ required: true }]}
          >
            <TreeSelect
              showSearch
              style={{ width: 330 }}
              treeNodeFilterProp='title'
              treeData={Object.keys(unLeafMenu).length > 0 ? unLeafMenu?.unDefault : []}
            />
          </ProForm.Item>
        </>
      )
    }
  </ModalForm>
};

export default BookDirectionModal;
