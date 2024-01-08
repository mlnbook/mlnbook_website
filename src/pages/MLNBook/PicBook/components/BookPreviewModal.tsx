import React from 'react';
import { ModalForm } from '@ant-design/pro-components';
import BookPreviewComponent from './BookPreviewComponent';


const BookPreviewModal: React.FC = (props) => {
  const {showPreviewModal, setShowPreviewModal, chapterParaData, page_layout} = props
  return <ModalForm
    title={<div>页面预览:<span style={{fontSize: 14}}>{page_layout?.title}</span></div>}
    width="462px"
    style={{
      padding: 0
    }}
    layout="horizontal"
    visible={showPreviewModal}
    onVisibleChange={setShowPreviewModal}
    submitter={false}
  >
    <BookPreviewComponent
      chapterParaData={chapterParaData}
      page_layout={page_layout}
    />
  </ModalForm>
};

export default BookPreviewModal;
