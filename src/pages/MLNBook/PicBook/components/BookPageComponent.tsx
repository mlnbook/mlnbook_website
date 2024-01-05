import React, {useEffect, useRef, useState} from 'react';
import ProForm, {ProFormGroup, ProFormUploadButton,} from '@ant-design/pro-form';
import {addChapterParagraph, deleteChapterParagraph, updateChapterParagraph} from '@/services/mlnbook/pic_book/api';
import {EditableProTable, ProCard} from '@ant-design/pro-components';
import {Image, message, Popconfirm, Space, Spin} from 'antd';
import {generateMD5, generateUUID} from '../../utils';
import {fetchBookPageMeta, fetchBookPageParagraphMeta} from '@/services/mlnbook/pic_book/page_api';
import ParaSortModal from './ParaSortModal';


/**
 * 章节页面内容配置模块
 * @param props
 * @returns
 */
const BookPageComponent: React.FC = (props) => {
  const { picBookId, selectPage, layoutOptionsData, layoutOriginData, configData } = props
  const formRef = useRef()

  const [spining, setSpining] = useState(false)

  // 控制编辑弹窗
  const [showModal, setShowModal] = useState(false);

  // 暂存图片id信息
  const [tmpPicId, setTmpPicId] = useState({})

  // 段落信息记录
  const [paraData, setParaData] = useState([])
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
      await updateParaData()

      setPageDetails(result)
      setSpining(false)
    }
  }, [selectPage?.page_id])

  // 获取页面段落数据
  const updateParaData = async () =>{
    const para_result = await fetchBookPageParagraphMeta({ id: selectPage?.page_id })
    setParaData(para_result)
  }

  const columns = [
    {
      title: '排序',
      dataIndex: 'seq'
    },
    {
      title: '内容',
      dataIndex: 'para_content',
    },
    {
      title: '知识点',
      dataIndex: 'knowledge'
    },
    {
      title: '插图',
      dataIndex: 'illustration',
      // valueType: 'textarea',
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
            <>
              <ProFormUploadButton
                max={1}
                name={'illustration'}
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
                      // 在这里可以设置请求头
                      const headers = {
                        Authorization: "Token " + localStorage.getItem("token")
                        // 其他自定义头部...
                      };
                      const formData = new FormData();
                      formData.append('pic_file', file);

                      const response = await fetch('/api/pic_book/pic_upload/', {
                        method: 'POST',
                        headers,
                        body: formData,
                      });
                      const result = await response.json()
                      if (response.ok) {
                        // 将插图的id返回回去
                        setTmpPicId({[data['record']['id']]: result?.id})
                        onSuccess(response, result?.id);
                      } else {
                        // 处理上传失败的逻辑
                        onError(response);
                      }
                    console.log(response)
                  }
                }}
                style={{
                  height: 30,
                  width: 30
                }}
                extra='支持 JPG、PNG 格式'
              />
              {/* <Modal open={previewOpen} footer={null} onCancel={()=>{setPreviewOpen(false)}}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal> */}
            </>
          );
        }
      }
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
          onConfirm={async () => {
            try {
              await deleteChapterParagraph(record)
              await updateParaData()
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
    {
      pageDetails?.layout_cfg &&
      <ProCard
        title='页面信息'
        bordered
        collapsible={true}
        defaultCollapsed={true}
      >
        <ProFormGroup style={{ height: 35 }}>
          <ProForm.Item label="名称"><span>{pageDetails?.layout_cfg?.title}</span></ProForm.Item>
          <ProForm.Item label="描述"><span>{pageDetails?.layout_cfg?.description}</span></ProForm.Item>
          <ProForm.Item label="栅格间距"><span>{pageDetails?.layout_cfg?.grid_gutter}</span></ProForm.Item>
          <ProForm.Item label="栅格布局"><span>{pageDetails?.layout_cfg?.grid_row_col}</span></ProForm.Item>
        </ProFormGroup>
        <ProFormGroup style={{ height: 35 }}>
          <ProForm.Item label="字体"><span>{pageDetails?.layout_cfg?.font_family}</span></ProForm.Item>
          <ProForm.Item label="字体颜色">
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
          <ProForm.Item label="字体大小"><span>{pageDetails?.layout_cfg?.font_size}</span></ProForm.Item>
          <ProForm.Item label="文本透明度"><span>{pageDetails?.layout_cfg?.text_opacity}</span></ProForm.Item>
        </ProFormGroup>
        <ProFormGroup style={{ height: 35 }}>
          <ProForm.Item label='背景图片'>
            <Image
              src={pageDetails?.layout_cfg?.background_img}
              width={35}
              height={35}
            />
          </ProForm.Item>
          <ProForm.Item label='背景颜色'>
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
    }
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
    >

      <EditableProTable
        rowKey="id"
        headerTitle={false}
        maxLength={5}
        actionRef={formRef}
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
              seq: paraData?.reduce((max, item) => {return item.seq > max ? item.seq : max;}, 0) + 1
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
        value={paraData || []}
        // request={async () => {
        //   const result = await fetchBookPageParagraphMeta({ id: selectPage?.page_id })
        //   setParaData(result)
        //   return { data: result, success: true }
        // }}
        editable={{
          type: 'multiple',
          onSave: async (rowKey, data, row) => {
            data['illustration'] = tmpPicId[rowKey] || data['illustration']
            if(typeof rowKey == 'string'){
              data['pic_book'] = pageDetails?.pic_book
              data['chapter'] = pageDetails?.chapter
              data['book_page'] = selectPage?.page_id
              data['para_content_uniq'] = generateMD5(data['para_content'])
              const result = await addChapterParagraph(data)
              if(result?.id){
                message.success('新增成功')
              }
              else{
                message.error('新增失败')
              }
            }
            else{
              const result = await updateChapterParagraph(data)
              if(result?.id){
                message.success('编辑成功')
              }
              else{
                message.error('编辑失败')
              }
            }
            // 更新数据显示
            await updateParaData()
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
    {
      showModal &&
      <ParaSortModal
        showModal={showModal}
        setShowModal={setShowModal}
        paraData={paraData}
        updateParaData={updateParaData}
        page_id={selectPage?.page_id}
      />
    }
  </Spin>
};

export default BookPageComponent;
