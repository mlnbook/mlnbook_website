import React, { useEffect, useRef, useState } from 'react';
import ProForm, { ProFormText, ProFormUploadButton, } from '@ant-design/pro-form';
import { addChapterParagraph, batchChapterAIGC, bookTypesetMeta, deleteChapterParagraph, updateChapterParagraph } from '@/services/mlnbook/pic_book/page_api';
import { EditableProTable, ProCard } from '@ant-design/pro-components';
import { Button, Col, Form, Image, message, Modal, Popconfirm, Row, Space, Spin, Tooltip, Result, Tabs } from 'antd';
import { generateMD5, generateUUID } from '../../utils';
import { fetchChapterParagraphMeta } from '@/services/mlnbook/pic_book/page_api';
import ParaSortModal from './ParaSortModal';
import ChapterTemplateModal from './ChapterTemplateModal';
// import BookPreviewModal from './BookPreviewModal';
import ContentArrangeComponent from './PreviewComponent/ContentArrangeComponent';
import { EditOutlined, LayoutOutlined } from '@ant-design/icons';
import ChapterTypesetModal from './ChapterTypesetModal';

/**
 * 章节内容配置模块
 * @param props
 * @returns
 */
const BookParaComponent: React.FC = (props) => {
  const editableFormRef = useRef();

  const { picBookId, selectChapter, setSelectChapter, layoutOptionsData, layoutOriginData, setLayoutOriginData, configData, refreshMenu } = props
  const formRef = useRef()
  const popFormRef = useRef()

  const [spining, setSpining] = useState(false)

  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);

  // 控制绘本typeset编辑弹窗
  const [showTypesetModal, setShowTypesetModal] = useState(false);

  // 控制章节模板编辑弹窗
  const [showChapterModal, setShowChapterModal] = useState(false)

  // 记录上传的图片信息
  const [uploadedImage, setUploadedImage] = useState({}); // 用于保存上传的文件信息

  // 章节&段落信息记录
  const [chapterParaData, setChapterParaData] = useState([])
  // 设置默认选中的版式
  const [selectTypeset, setSelectTypeSet] = useState(0);

  useEffect(async () => {
    if (selectChapter?.chapter_id) {
      setSpining(true)
      // 页面段落数据
      await updateChapterParaDataFunc()
      setSpining(false)
    }
  }, [selectChapter?.chapter_id])

  // 获取章节及页面段落数据函数
  const updateChapterParaDataFunc = async () => {
    const chapter_para_result = await fetchChapterParagraphMeta({ id: selectChapter?.chapter_id })
    // 补充图片url
    chapter_para_result['paragraphs'] = chapter_para_result?.paragraphs?.map((item, index) => {
      return { ...item, illustration_url: [{ url: item.illustration }] }
    })
    // 如果版式数量大于0 且未设置过选中的版式，则取第一个
    if (chapter_para_result?.typeset_data?.length > 0 && selectTypeset == 0) {
      setSelectTypeSet(chapter_para_result['typeset_data'][0]?.id)
    }
    setChapterParaData(chapter_para_result)
  }
  const columns = [
    {
      title: '排序',
      dataIndex: 'seq',
      width: '8%',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge',
      width: '22%',
      fieldProps: (_, { rowIndex, rowKey }) => {
        return {
          onChange: (value) => {
            const para_content = chapterParaData?.chapter?.text_template.replace(/{{word}}/g, value?.target?.value);
            editableFormRef.current?.setRowData?.(rowKey, { para_content: para_content });
          }
        };
      },
    },
    {
      title: '内容',
      dataIndex: 'para_content',
      width: '35%'
    },
    {
      title: '插图',
      dataIndex: 'illustration',
      width: '15%',
      render: (_, record) => {
        return record?.illustration ? <Image
          src={record?.illustration}
          width={35}
          height={35}
        /> : null
      },
      renderFormItem: (text, data, index) => {
        // 如果当前处于编辑状态，返回可编辑的 ProFormSelect
        if (text?.entry) {
          return (
            <ProForm
              initialValues={data?.record}
              submitter={false}
            >
              <ProFormUploadButton
                max={1}
                name={'illustration_url'}
                fieldProps={{
                  data: {},
                  defaultFileList: [],
                  multiple: false,
                  // onPreview: (file) => {
                  //   setPreviewImage(file.url || file.thumbUrl);
                  //   setPreviewOpen(true);
                  // },
                  // listType: 'picture-card',
                  // name: 'pic_file',
                  accept: '.png,.jpg,.jpeg',
                  maxCount: 1,
                  customRequest: async ({ file, onSuccess, onError }) => {
                    // 在这里可以处理文件上传逻辑
                    // 例如：将文件保存到状态中
                    setUploadedImage({ [data['record']['id']]: { file, onSuccess, onError } });

                    // 这里仅演示上传成功
                    onSuccess();
                  },
                  // customRequest: async ({ file, onSuccess, onError }) => {
                  //   // 在这里可以设置请求头
                  //   const headers = {
                  //     Authorization: "Token " + localStorage.getItem("token")
                  //     // 其他自定义头部...
                  //   };
                  //   const formData = new FormData();
                  //   formData.append('pic_file', file);

                  //   const response = await fetch('/api/pic_book/pic_upload/', {
                  //     method: 'POST',
                  //     headers,
                  //     body: formData,
                  //   });
                  //   const result = await response.json()
                  //   if (response.ok) {
                  //     // 将插图的id返回回去
                  //     setTmpPicId({ [data['record']['id']]: result?.id })
                  //     onSuccess(response, result?.id);
                  //   } else {
                  //     // 处理上传失败的逻辑
                  //     onError(response);
                  //   }
                  // }
                }}
                style={{
                  height: 30,
                  width: 30
                }}
                extra='支持 JPG、PNG 格式'
              />
            </ProForm>
          );
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: '18%',
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
          onConfirm={async () => {
            try {
              await deleteChapterParagraph(record)
              await updateChapterParaDataFunc()
              message.success('删除成功')
            } catch (error) {
              message.error('删除失败')
            }

          }}
        >
          <a>删除</a>
        </Popconfirm>
      ],
    },
  ]
  return <Spin spinning={spining}>
    <ProCard
      title='基础配置'
      bordered
      style={{
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'row', marginRight: '20px', position: 'relative', height: 35 }}>
          <div style={{ width: '50%', marginRight: '20px' }}>
            <ProForm.Item label={<strong>绘本名称</strong>}>
              <span>{configData?.title}</span>
            </ProForm.Item>
          </div>
          <div style={{ width: '50%' }}>
            <ProForm.Item>
            <strong><a onClick={()=>{setShowTypesetModal(true)}}><EditOutlined /> 绘本布局</a></strong>
            </ProForm.Item>
          </div>
          <div style={{
            top: 0,
            bottom: 0,
            left: "50%",
            width: "1px",
            backgroundColor: "#ccc",
            zIndex: 1
          }}></div>
        </div>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'row', position: 'relative', height: 35 }}>
          <div style={{ width: '30%', marginRight: '20px' }}>
            <ProForm.Item label={<strong>章节标题</strong>}>
              <span>{chapterParaData?.chapter?.title}</span>
            </ProForm.Item>
          </div>
          <div style={{ width: '70%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProForm.Item label={<strong>章节模板</strong>}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chapterParaData?.chapter?.text_template}
                </span>
                <a style={{ marginLeft: 5 }} onClick={() => { setShowChapterModal(true) }}><EditOutlined /></a>
              </ProForm.Item>
            </div>
          </div>
        </div>

      </div>
    </ProCard>
    <ProCard
      bordered
      extra={
        <Space>
          <Popconfirm
            key={'batch_aigc'}
            placement="bottomLeft" // 设置弹出位置为左下方
            title={
              <div>
                <h3>确定批量生成本章节图片吗？</h3>
                <ProForm formRef={popFormRef} submitter={false} layout={'horizontal'}>
                  <ProFormText
                    name="aigc_prompt"
                    label="图片提示词"
                    placeholder="生成式提示词"
                  />
                </ProForm>
              </div>
            }
            onConfirm={async () => {
              try {
                const params = {
                  id: selectChapter?.chapter_id,
                  aigc_prompt: popFormRef?.current?.getFieldsValue()?.aigc_prompt
                }
                const result = await batchChapterAIGC(params)
                message.success(result?.detail)
              } catch (error) {
                message.error('处理失败')
              }
            }}
          >
            <a>批量生成图片</a>
          </Popconfirm>
          <a onClick={() => { setShowModal(true) }}>
            内容排序
          </a>
        </Space>
      }
      style={{ width: '100%', height: '100%' }}
      title={`段落内容`}
    >
      <EditableProTable
        rowKey="id"
        headerTitle={false}
        actionRef={formRef}
        editableFormRef={editableFormRef}
        scroll={{
          x: 960,
          y: 350
        }}
        style={{ width: '100%' }}
        recordCreatorProps={
          {
            position: 'bottom',
            creatorButtonText: '添加段落',
            record: () => ({
              id: generateUUID(),
              seq: (chapterParaData?.paragraphs?.reduce((max, item) => { return item.seq > max ? item.seq : max; }, 0) || 0) + 1
            }),
          }
        }
        loading={false}
        columns={columns}
        value={chapterParaData?.paragraphs || []}
        editable={{
          type: 'multiple',
          onSave: async (rowKey, data, row) => {
            const formData = new FormData();
            if (uploadedImage[rowKey]?.file) {
              formData.append('illustration', uploadedImage[rowKey]?.file)
            }
            formData.append('pic_book', chapterParaData?.chapter?.pic_book)
            formData.append('chapter', chapterParaData?.chapter?.id)
            formData.append('para_content', data['para_content'])
            formData.append('knowledge', data['knowledge'])
            formData.append('para_content_uniq', generateMD5(data['para_content']))
            if (typeof rowKey == 'string') {
              const result = await addChapterParagraph(formData)
              if (result?.id) {
                message.success('新增成功')
              }
              else {
                message.error('新增失败')
              }
            }
            else {
              const result = await updateChapterParagraph(data?.id, formData)
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
              await deleteChapterParagraph(row)
              message.success('删除成功')
            } catch (error) {
              message.error('删除失败')
            }
          }
        }}

      />
    </ProCard>
    <ProCard
      title={'段落排版'}
      style={{ marginTop: 5 }}
    >
      <Tabs
        defaultActiveKey={selectTypeset}
        items={
          chapterParaData?.typeset_data?.map((item, i) => {
            return {
              label: `${item?.title}(${item?.c_type})`,
              key: item?.id,
            }
          })
        }
        onChange={(value) => {
          setSelectTypeSet(value)
        }}
      />
      {chapterParaData?.paragraphs?.length > 0 ?
        <ContentArrangeComponent
          selectTypeset={selectTypeset}
          chapterParaData={chapterParaData}
          layoutOriginData={layoutOriginData}
          layoutOptionsData={layoutOptionsData}
          updateChapterParaDataFunc={updateChapterParaDataFunc}
        /> : <Result
          status="warning"
          subTitle={"请添加段落后进行排版"}
        />
      }
    </ProCard>
    {
      showModal &&
      <ParaSortModal
        showModal={showModal}
        setShowModal={setShowModal}
        chapterParaData={chapterParaData}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
      />
    }
    {
      showChapterModal &&
      <ChapterTemplateModal
        showModal={showChapterModal}
        setShowModal={setShowChapterModal}
        chapterData={chapterParaData?.chapter}
        refreshMenu={refreshMenu}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
      />
    }
    {
      showTypesetModal &&
      <ChapterTypesetModal
        showTypesetModal={showTypesetModal}
        setShowTypesetModal={setShowTypesetModal}
        chapterParaData={chapterParaData}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
      />
    }
    {/* {
      showPreviewModal &&
      <BookPreviewModal
        showPreviewModal={showPreviewModal}
        setShowPreviewModal={setShowPreviewModal}
        chapterParaData={chapterParaData}
        page_layout={pageDetails?.layout_cfg}
      />
    } */}
    {/* {showLayoutModal &&
        <LayoutConfiguraton
          record={curLayoutData}
          setShowModal={setShowLayoutModal}
          showModal={showLayoutModal}
          updatePageDetailsFunc={updatePageDetailsFunc}
        />
    } */}
  </Spin>
};

export default BookParaComponent;
