import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Popconfirm, Space, Spin, Upload, message } from 'antd';
import { DragSortTable, ProCard, ProFormText, ProTable } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { addPicBook, authorList, deleteChapter, picBookChapterMeta, picBookMeta, updatePicBook, voiceTemplateList } from '@/services/mlnbook/pic_book/api';
import { MenuOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ChapterModal from './ChapterModal';


const ChapterConfigComponent: React.FC = (props) => {
  // 提取参数
  const { configId, setCurrent, setConfigId } = props
  const actionRef = useRef<ActionType>();
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);
  // 当前编辑的内容
  const [currentRow, setCurrentRow] = useState();
  const [spining, setSpining] = useState(false)

  const [chapterData, setChapterData] = useState([])

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
      title: "标题",
      dataIndex: 'title',
    },
    {
      title: "文案模板",
      dataIndex: 'text_template',
      valueType: 'textarea',
    },
    // {
    //   title: "操作人",
    //   dataIndex: 'user',
    // },
    {
      title: "修改时间",
      dataIndex: 'utime',
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setShowModal(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
          title="确认删除?"
          onConfirm={async() => {
            await deleteChapter({id: record?.id})
            message.success('删除成功')
            actionRef.current.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <a key="delete" style={{ marginLeft: 8 }}>
            删除
          </a>
        </Popconfirm>
      ],
    },
  ]
  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    // setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };
  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
    </>
  );

  return (
    <ProCard>
      <Spin spinning={spining}>
        <DragSortTable
          headerTitle="章节列表"
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          size={"small"}
          search={false}
          options={{
            density: false
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setShowModal(true);
                setCurrentRow({})
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
          pagination={false}
          request={async (
            params,
            sort,
            filter
          ) => {
            // params['currentPage'] = params.current
            // params['pageSize'] = params.pageSize
            params["id"] = configId
            const msg = await picBookChapterMeta(params)
            setChapterData(msg)
            return {
              data: msg
            }
          }}
          dragSortKey="seq"
          onDragSortEnd={handleDragSortEnd}
          dragSortHandlerRender={dragHandleRender}
        />
        {showModal &&
          <ChapterModal
            picBookId={configId}
            chapterData={chapterData}
            record={currentRow}
            setShowModal={setShowModal}
            showModal={showModal}
            actionRef={actionRef}
          />
        }
      </Spin>
    </ProCard>
  );
};

export default ChapterConfigComponent;
