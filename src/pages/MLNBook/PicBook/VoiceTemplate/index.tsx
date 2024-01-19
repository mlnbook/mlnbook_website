import {PlusOutlined, SoundOutlined} from '@ant-design/icons';
import {Button, Image, Popconfirm, Tabs, message} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {layoutList} from '@/services/mlnbook/layout_api';
import VoiceConfiguraton from './components/VoiceConfiguration';
import { picBookVoiceListMeta } from '@/services/mlnbook/pic_book/voice_api';
import VoiceRelationModal from './components/VoiceRelationModal';


const VoiceComponent: React.FC = (props) => {
  // 提取参数
  const { id } = props?.location?.query

  const [loading, setLoading] = useState(false);
  // 声音模板内容
  const [voiceListData, setVoiceListData] = useState({})
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);

   // 进入时加载目录
   useEffect(async () => {
    if (id) {
      // 加载书籍信息
      await updateVoiceListFunc()
    }
  }, [id])

  // 刷新目录
  const updateVoiceListFunc = async () => {
    setLoading(true)
    const result = await picBookVoiceListMeta({ id: id })
    setVoiceListData(result)
    setLoading(result)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: "知识点",
      dataIndex: 'knowledge',
    },
    {
      title: "段落内容",
      dataIndex: 'para_content',
      valueType: 'textarea',
    },
    {
      title: "语音状态",
      dataIndex: '_',
      render: (_, record) => [
        <>
          {/* <div>{record?.font_color}</div>
          <div
            style={{
              backgroundColor: record?.font_color,
              width: '55px',  // 调整框的宽度
              height: '20px', // 调整框的高度
              border: '1px solid lightgray',  // 添加浅色边框
              display: 'inline-block',  // 将元素设置为内联块级元素，使边框生效
            }}
          ></div> */}
        </>
      ],
    },
  ]

  return (
      <PageContainer title={false} pageHeaderRender={false} loading={loading}>
      <Tabs
        tabBarExtraContent={<Button type='primary' onClick={()=>{setShowModal(true)}}><PlusOutlined />关联新语音模板</Button>}
        items={
          voiceListData?.book_voice_relation?.map((_, i)=>{
            const id = String(i + 1);
            const item = _?.voice_template
            return {
              label: `${item?.title}(${item?.language}·${item?.tts_model})`,
              key: id,
            }
          })
          }
        />
        <ProTable
            headerTitle={'段落列表'}
            rowKey="key"
            size={"small"}
            search={false}
            options={{
              density: false,
              reload: false,
              setting: false
            }}
            toolBarRender={() => [
              <Button
                  type='dashed'
                  key="primary"
                  // onClick={() => {
                  //   return
                  // }}
                  style={{color: "red"}}
              >
                <Popconfirm
                  key={'delete'}
                  title='批量生成模板所有语音吗'
                  onConfirm={async () => {
                    try {
                      message.success('操作成功')
                    } catch (error) {
                      message.error('操作失败')
                    }

                  }}
                >
                  <SoundOutlined /> 批量生成
                </Popconfirm>
              </Button>,
            ]}
            dataSource={voiceListData?.paragraph || []}
            // dataSource={mockData}
            columns={columns||[]}
        />
        {showModal &&
        <VoiceRelationModal
          setShowModal={setShowModal}
          showModal={showModal}
          updateVoiceListFunc={updateVoiceListFunc}
          picBookId={id}
        />
        }
      </PageContainer>
  );
};

export default VoiceComponent;
