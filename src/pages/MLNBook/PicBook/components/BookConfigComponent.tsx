import React, { createRef, useEffect, useState } from 'react';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, } from '@ant-design/pro-form';
import { PicBookGradeOptions, PicBookLanguageLevelOptions, PicBookLanguageOptions, PicBookPhaseOptions } from "@/pages/MLNBook/constant";
import { Button, Form, Modal, Space, Spin, Upload, message } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { addPicBook, authorList, picBookMeta, updatePicBook, voiceTemplateList } from '@/services/mlnbook/picbook_api';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';


const BookConfigComponent: React.FC = (props) => {
  // 提取参数
  const {configId, setCurrent, setConfigId} = props
  const [form] = Form.useForm();
  const formRef = createRef()
  const [spining, setSpining] = useState(false)

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // 书籍基本信息
  const [picBookData, setPicBookData] = useState({})
  useEffect(async () => {
    if (configId) {
      setSpining(true)
      const result = await picBookMeta({ id: configId })
      // 处理author字段
      result['author'] = result?.author?.map((item)=>{return item.id}) || []
      setPicBookData(result)
      // 对cover_img格式进行处理
      if(result?.cover_img){
        result['cover_img'] = [
          {
            url:result?.cover_img
          }
        ]
      }
      form.setFieldsValue(result)
      setSpining(false)
    }
  }, [configId])
  return (
    <ProCard>
      <Spin spinning={spining}>
        <ProForm
          form={form}
          labelCol={{ span: 2 }}
          layout='horizontal'
          enctype="multipart/form-data"
          formRef={formRef}
          initialValues={picBookData?.id ? picBookData : {
            language: 'en_US',
            language_level: 'A1',
            phase: 'preschool',
            grade: 'age1-preschool',
            voice_template: 1
          }}
          submitter={{
            render: (_, dom) => {
              return <div
                style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 20 }}
              >
                <Space>
                  <Button onClick={() => { setCurrent(1) }}>
                    下一步
                  </Button>
                  <Button type='primary' htmlType='submit'>保存并进行下一步</Button>
                </Space>
              </div>;
            },
          }}
          onFinish={async (values) => {
            // const formatAuthor = authorData?.filter((author)=>values['author'].includes(author.id))
            // values['author'] = formatAuthor
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              // 如果字段的值是一个文件列表（如图片上传），则需要特殊处理
              if (key === 'cover_img') {
                formData.append(key, values[key][0].originFileObj);
              }
              else {
                formData.append(key, values[key]);
              }
            });
            let result;
            if(configId){
              formData.append('id', configId)
              result = await updatePicBook(configId, formData)
            }
            else{
              result = await addPicBook(formData)
            }
            if(result){
              setCurrent(1)
              if(!configId){
                setConfigId(result?.id)
              }
            }
          }}
        >
          <ProFormText
            rules={[{ required: true }]}
            name="title"
            label="书名"
            placeholder={'输入绘本名称'}
          />
          <ProFormSelect
            label='语言'
            rules={[{ required: true }]}
            name="language"
            placeholder={'选择绘本语言'}
            options={PicBookLanguageOptions}
          />
          <ProFormSelect
            label='语言级别'
            rules={[{ required: true }]}
            name="language_level"
            placeholder={'选择绘本语言'}
            options={PicBookLanguageLevelOptions}
          />
          <ProFormSelect
            label='学段'
            rules={[{ required: true }]}
            name="phase"
            placeholder={'选择绘本学段'}
            options={PicBookPhaseOptions}
          />
          <ProFormSelect
            label='年级'
            rules={[{ required: true }]}
            name="phase"
            placeholder={'选择绘本年级'}
            options={PicBookGradeOptions}
          />
          <ProFormSelect
            label='声音模板'
            rules={[{ required: true }]}
            name="voice_template"
            placeholder={'选择声音模板'}
            request={async () => {
              const result = await voiceTemplateList()
              const options = result?.map((item) => {
                return {
                  label: `${item.title}(${item.language}·${item.model_name}·${item.tts_model})`,
                  value: item.id
                }
              })
              return options
            }}
          />
          <ProFormUploadButton
            name='cover_img'
            label='封面图'
            fieldProps={{
              data: {},
              defaultFileList: [],
              multiple: false,
              onPreview: (file) => {
                setPreviewImage(file.url || file.thumbUrl);
                setPreviewOpen(true);
              },
              listType: 'picture-card',
              accept: '.png,.jpg,.jpeg',
              maxCount: 1,
            }}
            extra='支持 JPG、PNG 格式'
          />
          <Modal open={previewOpen} footer={null} onCancel={()=>{setPreviewOpen(false)}}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <ProFormSelect
            label='作者'
            rules={[{ required: true }]}
            name="author"
            mode='multiple'
            placeholder={'选择作者'}
            request={async () => {
              const result = await authorList()
              const options = result?.map((item) => {
                return {
                  label: `${item.name}(id:${item.id})`,
                  value: item.id
                }
              })
              return options
            }}

          />
          <ProFormTextArea
            // rules={[{required: true}]}
            name="description"
            label="描述"
          />
        </ProForm>
      </Spin>
    </ProCard>
  );
};

export default BookConfigComponent;
