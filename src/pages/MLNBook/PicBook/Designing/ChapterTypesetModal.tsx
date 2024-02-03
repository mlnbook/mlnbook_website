import React, { useRef } from 'react';
import { EditableProTable, ModalForm, ProFormText } from '@ant-design/pro-components';
import { addBookTypeset, deleteBookTypeset, updateBookChapter, updateBookTypeset } from '@/services/mlnbook/pic_book/page_api';
import { Alert, Popconfirm, message } from 'antd';
import { generateUUID } from '../../utils';


const ChapterTypesetModal: React.FC = (props) => {
  const formRef = useRef()
  const editableFormRef = useRef();
  // 提取参数
  const { showTypesetModal, setShowTypesetModal, chapterParaData, updateChapterParaDataFunc } = props

  const columns = [
    {
      title: '排序',
      dataIndex: 'seq',
      width: '8%'
    },
    {
      title: '模板信息',
      dataIndex: 'title',
      width: '30%',
      render: (_, record) => {
        if(record?.c_type == 'norm'){
          return <div>{record?.title}<br/>grid_row_col: {record?.layout_cfg?.[0]?.grid_row_col}</div>
        }
        return record?.title
      },
    },
    {
      title: '模板类型',
      dataIndex: 'c_type',
      width: '15%',
      valueEnum: {
        norm: { text: '内置模板', value: 'norm', disabled: true },
        custom: { text: '人工定制', value: 'custom' }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: '18%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          hidden={record?.c_type == 'norm'}
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={'delete'}
          title='确定删除此行？'
          onConfirm={async () => {
            try {
              await deleteBookTypeset(record)
              await updateChapterParaDataFunc()
              message.success('删除成功')
            } catch (error) {
              message.error('删除失败')
            }

          }}
        >
          <a hidden={record?.c_type == 'norm'}>删除</a>
        </Popconfirm>
      ],
    },
  ]
  return <ModalForm
    title={'编辑绘本布局'}
    width="750px"
    layout="horizontal"
    visible={showTypesetModal}
    onVisibleChange={setShowTypesetModal}
    submitter={false}
  >
    <Alert message="当前仅支持添加人工定制布局" type="warning" />
    <EditableProTable
      rowKey="id"
      headerTitle={false}
      actionRef={formRef}
      editableFormRef={editableFormRef}
      style={{ width: '100%' }}
      recordCreatorProps={
        {
          position: 'bottom',
          creatorButtonText: '添加布局',
          record: () => ({
            id: generateUUID(),
            seq: (chapterParaData?.typeset_data?.reduce((max, item) => { return item.seq > max ? item.seq : max; }, 0) || 0) + 1
          }),
        }
      }
      loading={false}
      columns={columns}
      value={chapterParaData?.typeset_data || []}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data, row) => {
          data['pic_book'] = chapterParaData?.chapter?.pic_book
          if (typeof rowKey == 'string') {
            const result = await addBookTypeset(data)
            if (result?.id) {
              message.success('新增成功')
            }
            else {
              message.error('新增失败')
            }
          }
          else {
            const result = await updateBookTypeset(data)
            if (result?.id) {
              message.success('编辑成功')
            }
            else {
              message.error('编辑失败')
            }
          }
          // 更新数据显示
          await updateChapterParaDataFunc()
        },
        onDelete: async (key, row) => {
          try {
            console.log('row', row)
            await deleteBookTypeset(row)
            message.success('删除成功')
          } catch (error) {
            message.error('删除失败')
          }
        }
      }}

    />
  </ModalForm>
};

export default ChapterTypesetModal;
