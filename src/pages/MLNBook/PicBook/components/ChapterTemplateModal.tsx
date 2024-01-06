import React, {useRef} from 'react';
import {ModalForm, ProFormText} from '@ant-design/pro-components';
import {updateBookChapter} from '@/services/mlnbook/pic_book/page_api';
import { message } from 'antd';


const ChapterTemplateModal: React.FC = (props) => {
  // 提取参数
  const { showModal, setShowModal, chapterData, updateChapterParaDataFunc } = props

  return <ModalForm
    title={'编辑章节模板'}
    width="500px"
    layout="horizontal"
    visible={showModal}
    onVisibleChange={setShowModal}
    initialValues={chapterData}
    onFinish={async (value) => {
      console.log(value, chapterData)
      const params = {
        id: chapterData?.id,
        text_template: value?.text_template
      }
      const result = await updateBookChapter(params)
      if(result){
        message.success('更新章节模板成功')
        // 更新数据
        await updateChapterParaDataFunc()
      }
      setShowModal(false);
    }}
  >
    <ProFormText
      name={'text_template'}
      label={'模板'}
      />
  </ModalForm>
};

export default ChapterTemplateModal;
