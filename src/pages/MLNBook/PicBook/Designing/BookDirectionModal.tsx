/**
 * 新增/编辑 章节的组件弹窗组件
 */
import React, {useEffect, useState} from 'react';
import {message, TreeSelect} from 'antd';
import {ModalForm, ProForm, ProFormText} from '@ant-design/pro-components';
import {addBookChapter, picBookChapterMenuMeta, picBookChapterMeta, updateBookChapter} from '@/services/mlnbook/pic_book/page_api';
import {formatFirstLevelMenuValue, formatMenuValue} from './utils';
import {ProFormSelect, ProFormTextArea} from '@ant-design/pro-form';


const BookDirectionModal: React.FC = (props) => {
  // 窗口是否可渲染
  const [modalLoading, setModalLoading] = useState(false)
  // 提取参数
  const { setShowMenuModal, showMenuModal, setEditMenu, editMenu, picBookId, layoutOptionsData, layoutOriginData, refreshMenu } = props
  // 分组父菜单
  const [unLeafMenu, updateUnLeafMenu] = useState(async () => {
    const result = await picBookChapterMenuMeta({ id: picBookId })
    // 添加目录的value字段，只取第一层
    const new_result = result?.map((item, index) =>{
      if ('children' in item) {
        delete item['children'];
      }
      item.value = item.key
      return item
    })
    let withDefault = Object.assign([], new_result);
    withDefault.unshift({ key: '0-0', title: '无父分组', value: '0-0' })
    updateUnLeafMenu(withDefault)
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
    title={editMenu?.title == undefined ? "新建章节" : "修改章节"}
    width="600px"
    layout="horizontal"
    visible={showMenuModal}
    onVisibleChange={setShowMenuModal}
    onFinish={async (value) => {

      let params;
      let success;
      // 新增逻辑
      if (editMenu?.title == undefined) {
          params = {
            pic_book: picBookId,
            title: value?.title,
            text_template: value?.text_template,
            parent: typeof value?.parent == 'number' ? value?.parent : null
          }
          success = await addBookChapter(params)
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
        treeData={Object.keys(unLeafMenu).length > 0 ? unLeafMenu : []}
      />
    </ProForm.Item>
  </ModalForm>
  )
};

export default BookDirectionModal;
