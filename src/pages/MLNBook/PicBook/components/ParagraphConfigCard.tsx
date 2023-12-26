import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormList,
  ProFormGroup,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { addBookPage, addChapter, chapterParagraphList, deleteChapterParagraph, picBookChapterPageParagraphMeta, updateBookPage, updateChapter } from '@/services/mlnbook/picbook_api';
import { EditableProTable, ProCard } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { generateMD5 } from '../../utils';


/**
 * 章节内容配置模块
 * @param props
 * @returns
 */
const ParagraphConfigCard: React.FC = (props) => {
  const { picBookId, kpointOptionsData, layoutOptionsData, chapterPage, setChapterPage } = props
  const [loading, setLoading] = useState(false)

  // 控制页面编辑处理
  const [currentPage, setCurrentPage] = useState({})
  const [showPageModal, setShowPageModal] = useState(false)

  // const [pageData, setPageData] = useState([])

  // useEffect(async () => {
  //   if (configId) {
  //     setSpining(true)
  //     const result = await picBookChapterPage({ id: configId })
  //     setChapterPage(result)
  //     setSpining(false)
  //   }
  // }, [configId])

  const columns = [
      {
        title: '排序',
        dataIndex: 'seq'
      },
      {
        title: '内容',
        dataIndex: 'para_content',
        // valueType: 'textarea',
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <Popconfirm
          key={'delete'}
          title='确定删除此行？'
          onConfirm={async()=>{
            try {
              await deleteChapterParagraph(record)
              message.success('删除成功')
            } catch (error){
              message.error('删除失败')
            }

          }}
          >
             <a>删除</a>
          </Popconfirm>
        ],
      },
  ]
  return <div>
    <ProCard
      loading={loading}
      title={`章节：${chapterPage?.title}`}
      direction="column"
      extra={
        <a onClick={() => {
          setCurrentPage({})
          setShowPageModal(true)
        }}>
          新增页面
        </a>
      }
      subTitle={`排序:${chapterPage?.seq}`}
      style={{ marginTop: 5}}
    >
      {
        chapterPage?.bookpage_set?.map((pageData, index) => {
          console.log('pageData', pageData)
          return <ProCard
            bordered
            style={{ marginTop: 10 }}
            extra={
              <Space>
                <a onClick={() => { console.log('新增页面') }}>
                  编辑
                </a>
                <a onClick={() => { console.log('新增页面') }}>
                  删除
                </a>
              </Space>
            }
            style={{ width: '90%' }}
            title={`page_${pageData?.id}(排序${pageData?.page_num})`}
          >

            <EditableProTable
            rowKey="id"
            headerTitle="段落列表"
            maxLength={5}
            // scroll={{
            //   x: 960,
            // }}
            recordCreatorProps={
              {
                position: 'bottom',
                record: () => ({}),
              }
              // position !== 'hidden'
              //   ? {
              //       position: position as 'top',
              //       record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              //     }
              //   : false
            }
            loading={false}
            columns={columns}
            // value={pageData?.paragraphs || []}
            request={async()=>{
              const params = {
                pic_book: picBookId,
                chapter: pageData?.chapter
              }
              const result = await chapterParagraphList(params)
              console.log(result)
              return []
            }}
            editable={{
              type: 'multiple',
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
              },
              onDelete: async (key, row) =>{
                try {
                  await deleteChapterParagraph(row)
                  message.success('删除成功')
                } catch (error){
                  message.error('删除失败')
                }
              }
            }}
          />

          </ProCard>
        })
      }
    </ProCard>
    {showPageModal &&
      <ModalForm
        title={currentPage?.id ? `编辑页面:${currentPage?.id}` : '新建页面'}
        width="600px"
        layout="horizontal"
        visible={showPageModal}
        initialValues={currentPage || {}}
        onVisibleChange={setShowPageModal}
        onFinish={async (value) => {
          let result;
          value['user'] = currentUser?.user
          if (currentPage?.id) {
            value['id'] = currentPage?.id
            result = await updateBookPage(value)
          }
          else {
            // 新建时绑定到pic_book及chapter上
            value['chapter'] = chapterPageParagraph?.id
            const maxSeq = chapterPageParagraph?.bookpage_set.length;
            value['page_num'] = maxSeq + 1
            value['paragraphs'] = []
            value['pic_book'] = picBookId
            result = await addBookPage(value)
          }
          if (result) {
            setShowPageModal(false);
            setLoading(true)
            const result = await picBookChapterPageParagraphMeta({ id: picBookId })
            setChapterPageParagraph(result)
            setLoading(false)
          }
        }}
      >
        <ProFormSelect
          rules={[{ required: true }]}
          labelCol={{ span: 4 }}
          width="md"
          label="页面模板"
          name="layout"
          options={layoutOptionsData}
        />
      </ModalForm>
    }
  </div>
};

export default ParagraphConfigCard;
