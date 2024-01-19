import { PlusOutlined, ReloadOutlined, SoundOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Tabs, Tag, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { bulkGenVoiceFiles, paragraphVoiceFiles, picBookVoiceListMeta } from '@/services/mlnbook/pic_book/voice_api';
import VoiceRelationModal from './components/VoiceRelationModal';


const VoiceComponent: React.FC = (props) => {
  // 提取参数
  const { id } = props?.location?.query

  const [loading, setLoading] = useState(false);
  // 声音模板内容
  const [voiceListData, setVoiceListData] = useState({})
  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);

  // 当前选中的tab
  const [selectTab, setSelectTab] = useState("")

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
    // 结果处理，将语音文件匹配进去
    result['voice_map'] = result?.voice_files?.reduce((accumulator, item) => {
      const key = `${item?.voice_template}_${item?.para_content_uniq}`;
      accumulator[key] = item;
      return accumulator;
    }, {});

    setVoiceListData(result)
    // 设置默认选中的tab
    if (result?.book_voice_relation.length > 0) {
      setSelectTab(result?.book_voice_relation[0]?.voice_template?.id)
    }
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
      render: (_, record) => {
        const key = `${selectTab}_${record?.para_content_uniq}`
        if (voiceListData?.voice_map?.[key]) {
          if (voiceListData?.voice_map[key]['job_state'] == 0) {
            return <Tag color="processing">生成中</Tag>;
          }
          else {
            return <Tag color="success">已生成</Tag>;
          }
        }
        else {
          return <Tag color="default">待生成</Tag>;
        }
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm
          key={'1'}
          title='确认重新生成语音吗？'
          onConfirm={() => {
            try {
              const params = {
                pic_book: id,
                voice_template: selectTab,
                para_content_uniq: record?.para_content_uniq
              }
              paragraphVoiceFiles(params)
              message.success('操作成功，请稍后刷新页面查看状态')
            } catch (error) {
              message.error('操作失败')
            }

          }}
        >
          <a>重新生成</a>
        </Popconfirm>,
        <a
          hidden={!voiceListData?.voice_map?.[`${selectTab}_${record?.para_content_uniq}`]?.voice_file}
          onClick={() => {
            const voice_file = voiceListData?.voice_map?.[`${selectTab}_${record?.para_content_uniq}`]?.voice_file
            const audio = new Audio(voice_file);
            audio.play().catch(error => {
              console.error('音频播放失败:', error);
            });
          }}
        >
          <SoundOutlined
            style={{ marginRight: '2px', fontSize: '16px', color: 'blue' }}


          /> 试听
        </a>
      ],
    },
  ]

  return (
    <PageContainer title={false} pageHeaderRender={false} loading={loading}>
      <Tabs
        tabBarExtraContent={<Button type='primary' onClick={() => { setShowModal(true) }}><PlusOutlined />关联新语音模板</Button>}
        defaultActiveKey={selectTab}
        items={
          voiceListData?.book_voice_relation?.map((_, i) => {
            const id = String(i + 1);
            const item = _?.voice_template
            return {
              label: `${item?.title}(${item?.language}·${item?.tts_model})`,
              key: item?.id,
            }
          })
        }
        onChange={(value) => {
          setSelectTab(value)
        }}
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
            style={{ color: "red" }}
          >
            <Popconfirm
              key={'delete'}
              title='批量生成模板所有语音吗'
              onConfirm={async () => {
                try {
                  const params = {
                    pic_book: id,
                    voice_template: selectTab
                  }
                  await bulkGenVoiceFiles(params)
                  message.success('操作成功，稍后刷新列表查看状态.')
                } catch (error) {
                  message.error('操作失败')
                }

              }}
            >
              <SoundOutlined /> 批量生成
            </Popconfirm>
          </Button>,
          <Button
            onClick={async () => { await updateVoiceListFunc() }}
          >
            <ReloadOutlined /> 刷新
          </Button>
        ]}
        dataSource={voiceListData?.paragraph || []}
        // dataSource={mockData}
        columns={columns || []}
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
