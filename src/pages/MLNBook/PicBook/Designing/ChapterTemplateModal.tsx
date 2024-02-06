import React, { useRef } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { updateBookChapter } from '@/services/mlnbook/pic_book/page_api';
import { message } from 'antd';


const ChapterTemplateModal: React.FC = (props) => {
  // 提取参数
  const { showModal, setShowModal, chapterData, updateChapterParaDataFunc, refreshMenu } = props
  return <ModalForm
    title={'编辑章节'}
    width="500px"
    layout="horizontal"
    visible={showModal}
    onVisibleChange={setShowModal}
    initialValues={chapterData}
    onFinish={async (value) => {
      const params = {
        id: chapterData?.id,
        title: value?.title,
        text_template: value?.text_template,
        prompt_template: value?.prompt_template,
      }
      const result = await updateBookChapter(params)
      if (result) {
        message.success('更新章节模板成功')
        // 更新数据
        await updateChapterParaDataFunc()
      }
      // 如果章节标题发生变更，则更新目录
      if (chapterData?.title != value?.title) {
        await refreshMenu()
      }
      setShowModal(false);
    }}
  >
    <ProFormText
      name={'title'}
      labelCol={{span: 5}}
      label={'章节标题'}
      rules={[{ required: true }]}
    />
    <ProFormText
      labelCol={{span: 5}}
      name={'text_template'}
      label={'文案模板'}
      rules={[{ required: true }]}
    />
    <ProFormText
      labelCol={{span: 5}}
      name={'prompt_template'}
      label={'提示词模板'}
      rules={[{ required: true }]}
    />
  </ModalForm>
};

export default ChapterTemplateModal;
