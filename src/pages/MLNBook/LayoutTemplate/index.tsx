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
import { layoutList } from '@/services/mlnbook/layout_api';

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
    // {
    //   title: "操作",
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //         key="config"
    //         onClick={() => {
    //           handleUpdateModalVisible(true);
    //           setCurrentRow(record);
    //         }}
    //     >
    //       修改
    //     </a>,
    //   ],
    // },
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
      </PageContainer>
  );
};

export default ChapterTemplateComponent;
