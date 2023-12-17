import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
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
    knowledge_uniq: 'abc',
    knowledge: 'dog, dog, dog',
    language: 'en_US',
    language_level: 'A1',
    phase: 'preschool',
    grade: 'age1-preschool',
    illustration: 1,
    pic_style: 'realistic',
    user: 1,
    ctime: '2023-12-17: 12:00:00',
    utime: '2023-12-17: 12:00:00'
  },
  {
    knowledge_uniq: 'bcd',
    knowledge: 'cat, cat, cat',
    language: 'en_US',
    language_level: 'A2',
    phase: 'kindergarten',
    grade: 'age2-preschool',
    illustration: 1,
    pic_style: 'realistic',
    user: 1,
    ctime: '2023-12-17: 13:00:00',
    utime: '2023-12-17: 13:00:00'
  }
]

const KpointComponent: React.FC = () => {
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
      title: "唯一标识",
      dataIndex: 'knowledge_uniq',
    },
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
      valueEnum: {
        en_US: "英语",
        zh_CN: "简体中文",
        fr_FR: "法语",
        es_ES: "西班牙语",
        ar_AE: "阿拉伯语",
        ru_RU: "俄语",
      }
    },
    {
      title: "语言级别",
      dataIndex: 'language_level',
      filters: true,
      onFilter: true,
      valueEnum: {
        A1: "入门级",
        A2: "基础级",
        B1: "进阶级",
        B2: "高阶级",
        C1: "流利运用级",
        C2: "精通级"
      }
    },
    {
      title: "学段",
      dataIndex: 'phase',
      filters: true,
      onFilter: true,
      valueEnum: {
        preschool: "学前班",
        kindergarten: "幼儿园",
        primary: "小学",
        middle: "初中",
        high: "高中",
        university: "大学",
      }
    },
    {
      title: "年级",
      dataIndex: 'grade',
      filters: true,
      onFilter: true,
      valueEnum: {
        "age1-preschool": "学前1岁",
        "age2-preschool": "学前2岁",
        "age3-preschool": "学前3岁",
        "age4-preschool": "学前4岁",
        "age5-preschool": "学前5岁",
        "kindergarten": "幼儿园",
        "grade1-primary": "小学一年级",
        "grade2-primary": "小学二年级",
        "grade3-primary": "小学三年级",
        "grade4-primary": "小学四年级",
        "grade5-primary": "小学五年级",
        "grade6-primary": "小学六年级",
        "grade7-middle": "初中一年级",
        "grade8-middle": "初中二年级",
        "grade9-middle": "初中三年级",
        "grade10-high": "高中一年级",
        "grade11-high": "高中二年级",
        "grade12-high": "高中三年级",
        "freshman-university": "大学一年级",
        "sophomore-university": "大学二年级",
        "junior-university": "大学三年级",
        "senior-university": "大学四年级",
      }
    },
    {
      title: "图片风格",
      dataIndex: 'pic_style',
    },
    {
      title: "插图",
      dataIndex: 'illustration',
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

export default KpointComponent;
