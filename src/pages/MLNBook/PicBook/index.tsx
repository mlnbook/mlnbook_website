import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { List, Image, Button, Tooltip } from 'antd';
import { history } from "@@/core/history";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { picBookList } from "@/services/mlnbook/picbook_api";
import { PicBookGradeOptions, PicBookLanguageLevelOptions, PicBookLanguageOptions, PicBookPhaseOptions } from '../constant';


const PicBookComponent: React.FC = () => {
  // 指标数据，不包含虚拟指标
  const [data, setData] = useState([]);
  const actionRef = useRef<ActionType>();

  useEffect(async () => {
    const result = await picBookList()
    setData(result)
  }, [])

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
            history.push({
              pathname: '/mlnbook/pic_book/config/',
              query: {id: record?.id}
          })
          }}
        >
          修改
        </a>,
      ],
    },
  ]

  return (
    <PageContainer title={false}>
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
              history.push({
                pathname: '/mlnbook/pic_book/config/',
            })
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

      {/* <List
                grid={{gutter: 16}}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <ProCard
                            title={
                                <a
                                    onClick={() => {
                                        history.push({
                                            pathname: '/mlnbook/pic_book/config/',
                                            query: {
                                                id: item.id
                                            }
                                        })
                                    }}
                                >{item.id}.{item.title}</a >
                            }
                            type="inner"
                            style={{width: 300, height: 350}}
                            extra={
                                <DeleteOutlined style={{color: "red"}}/>
                            }
                        >
                            <Image
                                src={item.cover_img || 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/06/a4/1f06a40d-7e6a-ee11-a31f-c4eff1cf3464/source/1024x1024bb.jpg'}
                                preview={false} width={240} height={240}/>
                            <Tooltip title={item.description} placement="bottom">
                                <p style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    marginBottom: 0
                                }}>{item.description}</p >
                            </Tooltip>
                        </ProCard>
                    </List.Item>
                )}
            /> */}
      {/* <Button
        style={{
          position: "fixed",
          marginTop: 15,
          bottom: 20,
          right: 50,
          zIndex: 9999,
          height: 50,
          width: 50,
          overflow: "auto"
        }}
        onClick={() => {
          history.push('/mlnbook/pic_book/config/')
        }}
        type={'primary'}
        shape={'circle'}
      ><PlusOutlined /></Button> */}
    </PageContainer>
  );
};

export default PicBookComponent;
