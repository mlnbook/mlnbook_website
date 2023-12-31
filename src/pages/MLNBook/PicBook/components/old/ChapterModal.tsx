import React, { useEffect } from 'react';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { addChapter, updateChapter } from '@/services/mlnbook/pic_book/api';


/**
 * 知识点编辑、配置模块
 * @param props
 * @returns
 */
const ChapterModal: React.FC = (props) => {
  const { picBookId, record, setShowModal, showModal, actionRef, chapterData } = props

  const initParams = record.id ? record : {}
  return <ModalForm
    title={record?.id ? `编辑章节:${record?.id}` : '新建章节'}
    width="600px"
    layout="horizontal"
    visible={showModal}
    initialValues={initParams}
    onVisibleChange={setShowModal}
    onFinish={async (value) => {
      let result;
      if (record?.id) {
        value['id'] = record?.id
        result = await updateChapter(value)
      }
      else {
        // 新建时绑定到pic_book上
        value['pic_book'] = picBookId
        const maxSeq = chapterData?.reduce((max, item) => {
          return item.seq > max ? item.seq : max;
        }, 0);
        value['seq'] = maxSeq + 1
        result = await addChapter(value)
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
      label="文案模板"
      name="text_template"
    />
  </ModalForm>
};

export default ChapterModal;
