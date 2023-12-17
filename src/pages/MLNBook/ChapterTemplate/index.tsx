import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Image } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const mockData = [
  {
    title: 'abc',
    description: 'dog, dog, dog',
    c_type: 'protected',
    text_template: "{},{},{}, it's {}",
    grid_layout: '1*1',
    font_color: 'blue',
    font_family: '宋体',
    font_size: 12,
    background_img: 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/06/a4/1f06a40d-7e6a-ee11-a31f-c4eff1cf3464/source/1024x1024bb.jpg',
    background_color: 'blue',
    text_position: 'top',
    text_opacity: '50',
    voice_template: 1,
    user: 1,
    ctime: '2023-12-17: 12:00:00',
    utime: '2023-12-17: 12:00:00'
  },
]

const ChapterTemplateComponent: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [currentRow, setCurrentRow] = useState();

  const actionRef = useRef<ActionType>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns = [
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
      title: "章节类型",
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
      title: "文案模板",
      dataIndex: 'text_template',
      valueType: 'textarea',
    },
    {
      title: "栅格布局",
      dataIndex: 'grid_layout',
      filters: true,
      onFilter: true,
      valueEnum: {
        "1*1": "1*1",
        "2*2": "2*2",
        "3*2": "3*2",
      }
    },
    {
      title: "颜色",
      dataIndex: 'font_color',
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
            width={150}
            height={150}
        />
      ],
    },
    {
      title: "背景颜色",
      dataIndex: 'background_color',
    },
    {
      title: "文本位置",
      dataIndex: 'text_position',
    },
    {
      title: "文本透明度",
      dataIndex: 'text_opacity',
    },
    {
      title: "声音模板",
      dataIndex: 'voice_template',
    },
    {
      title: "操作人",
      dataIndex: 'user',
    },
    {
      title: "最近修改时间",
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
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
        >
          修改
        </a>,
      ],
    },
  ];

  return (
      <PageContainer title={false}>
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
                  disabled
                  onClick={() => {
                    handleModalVisible(true);
                  }}
              >
                <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
              </Button>,
            ]}
            // request={rule}
            dataSource={mockData}
            columns={columns}
            // rowSelection={{
            //   onChange: (_, selectedRows) => {
            //     setSelectedRows(selectedRows);
            //   },
            // }}
        />
      </PageContainer>
  );
};

export default ChapterTemplateComponent;
