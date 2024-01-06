import React, { useEffect, useRef, useState } from 'react';
import ProForm, { ModalForm, ProFormGroup, ProFormText, ProFormUploadButton, } from '@ant-design/pro-form';
import { addChapterParagraph, deleteChapterParagraph, updateChapterParagraph } from '@/services/mlnbook/pic_book/api';
import { EditableProTable, ProCard } from '@ant-design/pro-components';
import { Button, Col, Form, Image, message, Modal, Popconfirm, Row, Space, Spin, Tooltip } from 'antd';
import { generateMD5, generateUUID } from '../../utils';
import { deleteBookPage, fetchBookPageMeta, fetchChapterParagraphMeta } from '@/services/mlnbook/pic_book/page_api';
import ParaSortModal from './ParaSortModal';
import { DeleteOutlined } from '@ant-design/icons';
import ChapterTemplateModal from './ChapterTemplateModal';


/**
 * 章节页面内容配置模块
 * @param props
 * @returns
 */
const BookPageComponent: React.FC = (props) => {
  const editableFormRef = useRef();

  const { picBookId, selectPage, setSelectPage, layoutOptionsData, layoutOriginData, configData, refreshMenu } = props
  const formRef = useRef()

  const [spining, setSpining] = useState(false)

  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);

  // 控制章节模板编辑弹窗
  const [showChapterModal, setShowChapterModal] = useState(false)

  // 记录上传的图片信息
  const [uploadedImage, setUploadedImage] = useState({}); // 用于保存上传的文件信息

  // 章节&段落信息记录
  const [chapterParaData, setChapterParaData] = useState([])
  // 页面明细
  const [pageDetails, setPageDetails] = useState({})
  useEffect(async () => {
    if (selectPage?.page_id) {
      setSpining(true)
      // 获取页面配置数据
      const result = await fetchBookPageMeta({ id: selectPage?.page_id })
      // 将layout信息补进去
      const layout_cfg = layoutOriginData?.find(item => item.id == result?.layout)
      result['layout_cfg'] = layout_cfg
      // 页面段落数据
      await updateChapterParaDataFunc()

      setPageDetails(result)
      setSpining(false)
    }
  }, [selectPage?.page_id])

  // 获取章节及页面段落数据函数
  const updateChapterParaDataFunc = async () => {
    const chapter_para_result = await fetchChapterParagraphMeta({ id: selectPage?.page_id })
    // 补充图片url
    chapter_para_result['paragraph'] = chapter_para_result?.paragraph?.map((item, index)=>{
      return {...item, illustration_url: [{url: item.illustration}]}
    })
    setChapterParaData(chapter_para_result)
  }
  const columns = [
    {
      title: '排序',
      dataIndex: 'seq',
      width: '8%'
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
      width: '40%'
    },
    {
      title: '插图',
      dataIndex: 'illustration',
      width: '20%',
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
      width: '10%',
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
      title={<div>编辑页面: <span style={{ color: 'red' }}><strong>{selectPage?.page_title}</strong></span></div>}
      bordered
      direction='column'
      extra={
        <Space>
          <Tooltip title='删除当前页面'>
            <Popconfirm
              key={'delete'}
              title='确定删除此页面吗？'
              onConfirm={async () => {
                try {
                  await deleteBookPage({ id: selectPage?.page_id })
                  setSelectPage(null)
                  await refreshMenu()
                  message.success('删除成功')
                } catch (error) {
                  message.error('删除失败')
                }
              }}
            >
              <DeleteOutlined style={{ color: "red", fontSize: '18px' }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      }
    >

      <Row gutter={[16, 16]}>
        <Col span={16}>

          <ProCard
            bordered
            title='页面模板'
          >
            <ProFormGroup style={{ height: 35 }}>
              <ProForm.Item label={<strong>名称</strong>}><span>{pageDetails?.layout_cfg?.title}</span></ProForm.Item>
              <ProForm.Item label={<strong>描述</strong>}><span>{pageDetails?.layout_cfg?.description}</span></ProForm.Item>
              <ProForm.Item label={<strong>栅格间距</strong>}><span>{pageDetails?.layout_cfg?.grid_gutter}</span></ProForm.Item>
              <ProForm.Item label={<strong>栅格布局</strong>}><span>{pageDetails?.layout_cfg?.grid_row_col}</span></ProForm.Item>
            </ProFormGroup>
            <ProFormGroup style={{ height: 35 }}>
              <ProForm.Item label={<strong>字体</strong>}><span>{pageDetails?.layout_cfg?.font_family}</span></ProForm.Item>
              <ProForm.Item label={<strong>字体颜色</strong>}>
                <div
                  style={{
                    backgroundColor: pageDetails?.layout_cfg?.font_color,
                    marginTop: 6,
                    width: '55px',  // 调整框的宽度
                    height: '20px', // 调整框的高度
                    border: '1px solid lightgray',  // 添加浅色边框
                    display: 'inline-block',  // 将元素设置为内联块级元素，使边框生效
                  }}
                ></div>
              </ProForm.Item>
              <ProForm.Item label={<strong>字体大小</strong>}><span>{pageDetails?.layout_cfg?.font_size}</span></ProForm.Item>
              <ProForm.Item label={<strong>文本透明度</strong>}><span>{pageDetails?.layout_cfg?.text_opacity}</span></ProForm.Item>
            </ProFormGroup>
            <ProFormGroup style={{ height: 35 }}>
              <ProForm.Item label={<strong>背景图片</strong>}>
                <Image
                  src={pageDetails?.layout_cfg?.background_img}
                  width={35}
                  height={35}
                />
              </ProForm.Item>
              <ProForm.Item label={<strong>背景颜色</strong>}>
                <div
                  style={{
                    backgroundColor: pageDetails?.layout_cfg?.background_color,
                    marginTop: 6,
                    width: '55px',  // 调整框的宽度
                    height: '20px', // 调整框的高度
                    border: '1px solid lightgray',  // 添加浅色边框
                    display: 'inline-block',  // 将元素设置为内联块级元素，使边框生效
                  }}
                ></div>
              </ProForm.Item>
            </ProFormGroup>
          </ProCard>
        </Col>
        <Col span={8}>
          <ProCard
            title='章节模板'
            bordered
            style={{
              height: '100%'
            }}
            extra={
              <Space>
                <a onClick={() => { setShowChapterModal(true) }}>
                  编辑
                </a>
              </Space>
            }
          >
            <ProForm.Item><span>{chapterParaData?.chapter?.text_template}</span></ProForm.Item>
          </ProCard>
        </Col>
      </Row>
      <ProCard
        bordered
        extra={
          <Space>
            <a onClick={() => { setShowModal(true) }}>
              内容排序
            </a>
          </Space>
        }
        style={{ width: '100%', height: '100%', marginTop: 10 }}
        title={`段落内容`}
        subTitle={<div>每页<span style={{ color: "red" }}>{JSON.parse(pageDetails?.layout_cfg?.grid_row_col || "[]").length}</span>个知识点！</div>}
      >

        <EditableProTable
          rowKey="id"
          headerTitle={false}
          maxLength={5}
          actionRef={formRef}
          editableFormRef={editableFormRef}
          // scroll={{
          //   x: 960,
          // }}
          style={{ width: '100%' }}
          recordCreatorProps={
            {
              position: 'bottom',
              creatorButtonText: '添加段落',
              record: () => ({
                id: generateUUID(),
                seq: chapterParaData?.paragraph?.reduce((max, item) => { return item.seq > max ? item.seq : max; }, 0) + 1
              }),
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
          value={chapterParaData?.paragraph || []}
          // request={async () => {
          //   const result = await fetchBookPageParagraphMeta({ id: selectPage?.page_id })
          //   setParaData(result)
          //   return { data: result, success: true }
          // }}
          editable={{
            type: 'multiple',
            onSave: async (rowKey, data, row) => {
              const formData = new FormData();
              if(uploadedImage[rowKey]?.file){
                formData.append('illustration', uploadedImage[rowKey]?.file)
              }
              formData.append('pic_book', pageDetails?.pic_book)
              formData.append('chapter', pageDetails?.chapter)
              formData.append('book_page', selectPage?.page_id)
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
    </ProCard>
    {
      showModal &&
      <ParaSortModal
        showModal={showModal}
        setShowModal={setShowModal}
        chapterParaData={chapterParaData}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
        page_id={selectPage?.page_id}
      />
    }

    {
      showChapterModal &&
      <ChapterTemplateModal
        showModal={showChapterModal}
        setShowModal={setShowChapterModal}
        chapterData={chapterParaData?.chapter}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
      />
    }
  </Spin>
};

export default BookPageComponent;
