import {PlusOutlined} from '@ant-design/icons';
import {Button, Image} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {layoutList} from '@/services/mlnbook/layout_api';
import LayoutConfiguraton from './components/LayoutConfiguration';


const ChapterTemplateComponent: React.FC = () => {
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);
  // 当前编辑的内容
  const [currentRow, setCurrentRow] = useState({});

  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: "标题",
      dataIndex: 'title',
    },
    {
      title: "描述",
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: "类型",
      dataIndex: 'c_type',
      filters: true,
      onFilter: true,
      valueEnum: {
        public: "完全公开",
        protected: "内部使用",
        private: "私有",
      }
    },
    {
      title: "栅格布局",
      dataIndex: 'grid_row_col',
    },
    {
      title: "栅格间距",
      dataIndex: 'grid_gutter',
    },
    {
      title: "颜色",
      dataIndex: 'font_color',
      render: (_, record) => [
        <>
          <div>{record?.font_color}</div>
          <div
            style={{
              backgroundColor: record?.font_color,
              width: '55px',  // 调整框的宽度
              height: '20px', // 调整框的高度
              border: '1px solid lightgray',  // 添加浅色边框
              display: 'inline-block',  // 将元素设置为内联块级元素，使边框生效
            }}
          ></div>
        </>
      ],
    },
    {
      title: "字体",
      dataIndex: 'font_family',
    },
    {
      title: "文字大小",
      dataIndex: 'font_size',
    },
    {
      title: "背景图片",
      dataIndex: 'background_img',
      render: (_, record) => [
        <Image
            src={record?.background_img}
            width={35}
            height={35}
        />
      ],
    },
    {
      title: "背景颜色",
      dataIndex: 'background_color',
      render: (_, record) => [
        <>
          <div>{record?.background_color}</div>
          <div
            style={{
              backgroundColor: record?.background_color,
              width: '55px',  // 调整框的宽度
              height: '20px', // 调整框的高度
              border: '1px solid lightgray',  // 添加浅色边框
              display: 'inline-block',  // 将元素设置为内联块级元素，使边框生效
            }}
          ></div>
        </>
      ],
    },
    {
      title: "文本主轴位置",
      dataIndex: 'text_flex_justify',
    },
    {
      title: "文本交叉位置",
      dataIndex: 'text_flex_align',
    },
    {
      title: "文本透明度",
      dataIndex: 'text_opacity',
    },
    {
      title: "操作人",
      dataIndex: 'user',
    },
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
      ],
    },
  ];

  return (
      <PageContainer title={false} pageHeaderRender={false}>
        <ProTable
            headerTitle={'模板列表'}
            actionRef={actionRef}
            rowKey="key"
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
                    setCurrentRow({})
                    setShowModal(true);
                  }}
              >
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={async (
                params,
                sort,
                filter
            ) =>{
                // params['currentPage'] = params.current
                // params['pageSize'] = params.pageSize
                const msg = await layoutList(params)
                return {
                  data: msg
                }
            }}
            // dataSource={mockData}
            columns={columns}
            // rowSelection={{
            //   onChange: (_, selectedRows) => {
            //     setSelectedRows(selectedRows);
            //   },
            // }}
        />
        {showModal &&
        <LayoutConfiguraton
          record={currentRow}
          setShowModal={setShowModal}
          showModal={showModal}
          actionRef={actionRef}
        />
        }
      </PageContainer>
  );
};

export default ChapterTemplateComponent;
