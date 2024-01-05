import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React, {useRef, useState} from 'react';
import {FormattedMessage} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {knowledgeList} from '@/services/mlnbook/knowledge_api';
import {
  PicBookGradeOptions,
  PicBookLanguageLevelOptions,
  PicBookLanguageOptions,
  PicBookPhaseOptions
} from '../constant';
import KpointConfiguraton from './components/KpointConfiguration';

const KpointComponent: React.FC = () => {
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);
  // 当前编辑的内容
  const [currentRow, setCurrentRow] = useState();
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    // {
    //   title: "唯一标识",
    //   dataIndex: 'knowledge_uniq',
    // },
    {
      title: "内容",
      dataIndex: 'knowledge',
      valueType: 'textarea',
    },
    {
      title: "语言",
      dataIndex: 'language',
      filters: true,
      onFilter: true,
      valueEnum: PicBookLanguageOptions.reduce((acc, { value, label }) => { acc[value] = { text: label }; return acc; }, {})
    },
    {
      title: "语言级别",
      dataIndex: 'language_level',
      filters: true,
      onFilter: true,
      valueEnum: PicBookLanguageLevelOptions.reduce((acc, { value, label }) => { acc[value] = { text: label }; return acc; }, {})
    },
    {
      title: "学段",
      dataIndex: 'phase',
      filters: true,
      onFilter: true,
      valueEnum: PicBookPhaseOptions.reduce((acc, { value, label }) => { acc[value] = { text: label }; return acc; }, {})
    },
    {
      title: "年级",
      dataIndex: 'grade',
      filters: true,
      onFilter: true,
      valueEnum: PicBookGradeOptions.reduce((acc, { value, label }) => { acc[value] = { text: label }; return acc; }, {})
    },
    {
      title: "插图",
      dataIndex: 'illustration',
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
      ],
    },
  ];

  return (
    <PageContainer title={false} pageHeaderRender={false}>
      <ProTable
        headerTitle={'知识点列表'}
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
              setShowModal(true);
              setCurrentRow({})
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // request={rule}
        request={async (
          params,
          sort,
          filter
        ) => {
          // params['currentPage'] = params.current
          // params['pageSize'] = params.pageSize
          const msg = await knowledgeList(params)
          return {
            data: msg
          }
        }}
        columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
      // }}
      />
      {showModal &&
        <KpointConfiguraton
          record={currentRow}
          setShowModal={setShowModal}
          showModal={showModal}
          actionRef={actionRef}
        />
      }
    </PageContainer>
  );
};

export default KpointComponent;
