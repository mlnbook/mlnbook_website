import React, { createRef, useEffect, useState } from 'react';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, } from '@ant-design/pro-form';
import { PicBookGradeOptions, PicBookLanguageLevelOptions, PicBookLanguageOptions, PicBookPhaseOptions } from "@/pages/MLNBook/constant";
import { Button, Form, Modal, Result, Space, Spin, Upload, message } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from 'umi';
import { addPicBook, authorList, picBookChapterMeta, picBookChapterPageParagraphMeta, picBookMeta, updatePicBook, voiceTemplateList } from '@/services/mlnbook/picbook_api';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ParagraphConfigCard from './ParagraphConfigCard';
import { knowledgeList } from '@/services/mlnbook/knowledge_api';
import { layoutList } from '@/services/mlnbook/layout_api';


const ParagraphConfigComponent: React.FC = (props) => {
  // 提取参数
  const { configId, setCurrent, setConfigId } = props
  const [form] = Form.useForm();
  const formRef = createRef()
  // 用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [spining, setSpining] = useState(false)
  // 章节页面内容
  const [chapterPageParagraph, setChapterPageParagraph] = useState([])

  // 获取知识点
  const [kpointOptionsData, setKpointOptionsData] = useState(async ()=>{
    const result = await knowledgeList({})
    const tmp = result?.map((item)=>{return {label: item?.knowledge, value: item?.id}})
    setKpointOptionsData(tmp)
  })

  // 获取页面模板
  const [layoutOptionsData, setLayoutOptionsData] = useState(async ()=> {
    const result = await layoutList({})
    const tmp = result?.map((item)=>{return {label: `${item?.title}(${item?.grid_row_col})`, value: item?.id}})
    setLayoutOptionsData(tmp)
  })

  useEffect(async () => {
    if (configId) {
      setSpining(true)
      const result = await picBookChapterPageParagraphMeta({ id: configId })
      setChapterPageParagraph(result)
      setSpining(false)
    }
  }, [configId])
  return (
    <div>
      {Object.keys(chapterPageParagraph).length > 0 ?
        <div>
          <Spin spinning={spining}>
            {
              chapterPageParagraph?.map((item, index) => {
                return <ParagraphConfigCard
                  picBookId={configId}
                  kpointOptionsData={kpointOptionsData}
                  layoutOptionsData={layoutOptionsData}
                  chapterPageParagraph={item}
                  setChapterPageParagraph={setChapterPageParagraph}
                />
              })
            }
          </Spin>
        </div> : <ProCard><Result subTitle="暂无章节，请先配置章节"/></ProCard>
      }
    </div>
  );
};

export default ParagraphConfigComponent;
