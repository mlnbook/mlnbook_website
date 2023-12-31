import React, {useEffect, useRef, useState} from 'react';
import {message, TreeSelect} from 'antd';
import {ModalForm, ProForm, ProFormText, ProFormRadio} from '@ant-design/pro-components';
import {addBookPage} from '@/services/mlnbook/pic_book/api';
import {addBookChapter, picBookChapterMenuMeta, picBookChapterMeta, updateBookChapter} from '@/services/mlnbook/pic_book/page_api';
import {formatMenuValue} from './utils';
import {ProFormSelect, ProFormTextArea} from '@ant-design/pro-form';


const BookDirectionModal: React.FC = (props) => {
  // 窗口是否可渲染
  const [modalLoading, setModalLoading] = useState(false)
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
// 如果是编辑时，请求章节接口获取模板
  useEffect(async () => {
    if (editMenu?.key) {
      // 加载书籍信息
      setModalLoading(true)
      const result = await picBookChapterMeta({ id: editMenu?.key })
      editMenu['text_template'] = result?.text_template
      setModalLoading(false)
    }
    else{
      setModalLoading(false)
    }
  }, [editMenu?.key])


  return (!modalLoading &&
  <ModalForm
    title={editMenu?.title == undefined ? "新建章节/页面" : "修改章节"}
    width="600px"
    layout="horizontal"
    visible={showMenuModal}
    onVisibleChange={setShowMenuModal}
    onFinish={async (value) => {

      let params;
      let success;
      // 新增逻辑
      if (editMenu?.title == undefined) {
        if (addType == 'chapter') {
          params = {
            pic_book: picBookId,
            title: value?.title,
            text_template: value?.text_template,
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
          text_template: value?.text_template,
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
        <ProFormTextArea
          width={"md"}
          name="text_template"
          label="文案模板"
          labelCol={{ span: 4 }}
          initialValue={editMenu?.text_template || ""}
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
  )
};

export default BookDirectionModal;
