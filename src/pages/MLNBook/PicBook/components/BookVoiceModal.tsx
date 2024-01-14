import React, {useEffect, useRef, useState} from 'react';
import {ModalForm, ProForm, ProFormUploadButton} from '@ant-design/pro-components';
import { addParagraphVoice, paragraphVoiceListMeta, updateParagraphVoice } from '@/services/mlnbook/pic_book/voice_api';
import { Button } from 'antd';


const BookVoiceModal: React.FC = (props) => {
  // 提取参数
  const { showModal, setShowModal, record } = props
  const [loading, setLoading] = useState(false)
  const [isReplace, setIsReplace] = useState(false);

  // 段落语音内容
  const [paraVoiceData, setParaVoiceData] = useState({})
  // 获取当前的语音信息
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        pic_book: record?.pic_book,
        para_content_uniq: record?.para_content_uniq,
      };
      try {
        const result = await paragraphVoiceListMeta(params);
        setParaVoiceData(result?.[0] || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [record?.id]);

  return <ModalForm
      title={"编辑语音"}
      width="600px"
      layout="horizontal"
      visible={showModal}
      onVisibleChange={setShowModal}
      onFinish={async (value) => {
        const formData = new FormData();
        formData.append('voice_file', value['voice_file'][0].originFileObj);
        formData.append('pic_book', record?.pic_book)
        formData.append('voice_template', "1")
        formData.append('para_content_uniq', record?.para_content_uniq)

        let result;
        if(paraVoiceData?.id){
          formData.append('id', paraVoiceData?.id)
          result = await updateParagraphVoice(paraVoiceData?.id, formData)
        }
        else{
          result = await addParagraphVoice(formData)
        }
        if(result){
          setShowModal(false)
        }
      }}
      modalProps={{
        closable: false
      }}
    >
      <div>
        {paraVoiceData?.voice_file && !isReplace ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <audio controls style={{ marginRight: '20px' }}>
              <source src={paraVoiceData?.voice_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div>
              <Button type='primary'
                onClick={()=>{
                  setIsReplace(true)
                }}
              >替换</Button>
            </div>
        </div>
        ) : (
          <div>
            {/* 如果没有内容，显示上传语音按钮 */}
            <ProFormUploadButton
              name='voice_file'
              label='语音文件'
              max={1}
              fieldProps={{
                data: {},
                defaultFileList: [],
                multiple: false,
                listType: 'picture-card',
                accept: '.mp3,.wav',
                maxCount: 1,
              }}
              extra='支持 mp3、wav 格式'
            />
          </div>
        )}
      </div>
    </ModalForm>
  // )
};

export default BookVoiceModal;
