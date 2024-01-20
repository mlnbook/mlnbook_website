/**
 * 书籍编辑组件
 */
import React, {useEffect, useState} from 'react';
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton,} from '@ant-design/pro-form';
import {
    PicBookGradeOptions,
    PicBookLanguageLevelOptions,
    PicBookLanguageOptions,
    PicBookPhaseOptions
} from "@/pages/MLNBook/constant";
import {Form, Modal} from 'antd';
import {addPicBook, authorList, picBookMeta, updatePicBook, voiceTemplateList} from '@/services/mlnbook/pic_book/api';


const BookConfigComponent: React.FC = (props) => {
  // 提取参数
  const {record, setShowModal, showModal, actionRef} = props
  const [form] = Form.useForm();
 console.log()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  // 书籍基本信息
  const [picBookData, setPicBookData] = useState({})
  useEffect(async () => {
    if (record?.id) {
      const result = await picBookMeta({ id: record?.id })
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
    }
  }, [record?.id])
  return (
        <ModalForm
          title={record?.id ? `编辑绘本:${record?.id}`: '新建绘本'}
          form={form}
          labelCol={{ span: 3 }}
          layout="horizontal"
          visible={showModal}
          onVisibleChange={setShowModal}
          // enctype="multipart/form-data"
          initialValues={picBookData?.id ? picBookData : {
            language: 'en_US',
            language_level: 'A1',
            phase: 'preschool',
            grade: 'age1-preschool',
            voice_template: [1]
          }}
          onFinish={async (values) => {
            // const formatAuthor = authorData?.filter((author)=>values['author'].includes(author.id))
            // values['author'] = formatAuthor
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              // 如果字段的值是一个文件列表（如图片上传），则需要特殊处理
              if (key === 'cover_img') {
                if(values[key][0].originFileObj){
                  formData.append(key, values[key][0].originFileObj);
                }
              }
              else {
                formData.append(key, values[key]);
              }
            });
            let result;
            if(record?.id){
              formData.append('id', record?.id)
              result = await updatePicBook(record?.id, formData)
            }
            else{
              result = await addPicBook(formData)
            }
            if(result){
              setShowModal(false)
              actionRef?.current?.reload()
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
          {/* <ProFormSelect
            label='声音模板'
            rules={[{ required: true }]}
            name="voice_template"
            mode='multiple'
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
          /> */}
          <ProFormUploadButton
            name='cover_img'
            label='封面图'
            max={1}
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
        </ModalForm>
  );
};

export default BookConfigComponent;
