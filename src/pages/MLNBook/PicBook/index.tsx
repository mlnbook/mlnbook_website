import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {ProTable} from '@ant-design/pro-components';
import {Button, Image} from 'antd';
import {history} from "@@/core/history";
import {PlusOutlined} from '@ant-design/icons';
import {picBookList} from "@/services/mlnbook/pic_book/api";
import {
  PicBookGradeOptions,
  PicBookLanguageLevelOptions,
  PicBookLanguageOptions,
  PicBookPhaseOptions
} from '../constant';
import BookConfigComponent from './components/BookConfigComponent';


const PicBookComponent: React.FC = () => {
  // // 指标数据，不包含虚拟指标
  // const [data, setData] = useState([]);
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);
  // 当前编辑的内容
  const [currentRow, setCurrentRow] = useState();
  const actionRef = useRef<ActionType>();

  // useEffect(async () => {
  //   const result = await picBookList()
  //   setData(result)
  // }, [])

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
      width: '15%'
    },
    {
      title: "封面图",
      dataIndex: 'cover_img',
      render: (_, record) => [
        record?.cover_img?
        <Image
            src={record?.cover_img}
            width={35}
            height={35}
        />: null
      ],
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
      title: "作者",
      dataIndex: 'author',
      render: (_, record) => {
        return record?.author?.map(item => item.name).join(', ') || ''
      },
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
            setShowModal(true)
            setCurrentRow(record)
          }}
        >
          编辑
        </a>,
        <a
        key="config"
        onClick={() => {
          history.push({
            pathname: '/pic_book/designing',
            query: {id: record?.id}
        })
        }}
      >
        排版
      </a>,
      <a
      key="config"
      onClick={() => {
        history.push({
          pathname: '/pic_book/voice',
          query: {id: record?.id}
      })
      }}
    >
      语音生成
    </a>,
      ],
    },
  ]

  return (
    <PageContainer title={false} pageHeaderRender={false}>
      <ProTable
        headerTitle={'绘本列表'}
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
              setShowModal(true)
              setCurrentRow({})
            }}
          >
            <PlusOutlined /> 新建
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
          const msg = await picBookList(params)
          return {
            data: msg
          }
        }}
        columns={columns}
      />
      {showModal &&
      <BookConfigComponent
        record={currentRow}
        setShowModal={setShowModal}
        showModal={showModal}
        actionRef={actionRef}
      />
      }
    </PageContainer>
  );
};

export default PicBookComponent;
