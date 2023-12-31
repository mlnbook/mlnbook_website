import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Popconfirm, Space, Spin, Upload, message } from 'antd';
import { DragSortTable, ModalForm, ProCard, ProFormText, ProTable } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { addPicBook, authorList, deleteChapter, picBookChapterMeta, picBookMeta, updatePicBook, voiceTemplateList } from '@/services/mlnbook/pic_book/api';
import { MenuOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ChapterModal from './old/ChapterModal';
import { fetchBookPageParagraphMeta, updateChapterParagraphSeq } from '@/services/mlnbook/pic_book/page_api';


const ParaSortModal: React.FC = (props) => {
  const actionRef = useRef()
  // 提取参数
  const { showModal, setShowModal, page_id, kpointOptionsData, paraData, updateParaData } = props

  const columns = [
    {
      title: "排序",
      dataIndex: 'seq',
      render: (dom, rowData, index) => {
        return (
          <span className="customRender"> {rowData?.seq}</span>
        );
      },
    },
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: '内容',
      dataIndex: 'para_content',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge_point',
      render: (_, record) => {
        return kpointOptionsData?.find((item => item.value == record?.knowledge_point))?.label
      },
      renderFormItem: (text, data, index) => {
        // 如果当前处于编辑状态，返回可编辑的 ProFormSelect
        if (text?.entry) {
          return (
            <Select
              initialValue={data?.knowledge_point}
              options={kpointOptionsData}
            />
          );
        }
      }
    }
  ]
  const handleDragSortEnd = async (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    const seq_list = newDataSource?.map((item, index)=>{return item?.id})
    await updateChapterParagraphSeq({seq_list: seq_list})
    await updateParaData()
  };
  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
    </>
  );

  return (<ModalForm
    title={'调整段落内容顺序'}
    width="600px"
    layout="horizontal"
    visible={showModal}
    onVisibleChange={setShowModal}
    onFinish={async (value) => {
      setShowModal(false);
    }}
    modalProps={{
      closable: false
    }}
    submitter={{
      render: (_, dom) => {
        return (
          <div>
            {dom[1]} {/* 只显示确定按钮 */}
          </div>
        );
      },
    }}
  >
    <DragSortTable
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      size={"small"}
      search={false}
      options={{
        density: false
      }}
      toolBarRender={false}
      pagination={false}
      dataSource={paraData}
      // request={async (
      //   params,
      //   sort,
      //   filter
      // ) => {
      //   // params['currentPage'] = params.current
      //   // params['pageSize'] = params.pageSize
      //   const result = await fetchBookPageParagraphMeta({ id: page_id })
      //   return {
      //     data: result
      //   }
      // }}
      dragSortKey="seq"
      onDragSortEnd={handleDragSortEnd}
      dragSortHandlerRender={dragHandleRender}
    />
  </ModalForm>
  );
};

export default ParaSortModal;