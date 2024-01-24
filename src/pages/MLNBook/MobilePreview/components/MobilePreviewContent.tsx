import React, { useEffect, useRef, useState } from 'react'
import { Toast, Button, Skeleton, Picker, Space } from 'antd-mobile'
import { Col, Row, Spin } from 'antd';
import '../mobile.css'; // 引入样式文件
import { picBookPreviewMeta } from '@/services/mlnbook/pic_book/api';
import {
  LeftOutline,
  SoundOutline,
  RightOutline
} from 'antd-mobile-icons'

/**
 * 移动端预览内容组件
 * @param props
 * @returns
 */
const MobilePreviewContent: React.FC = (props) => {
  const { record } = props
  const [loading, setLoading] = useState(false)

  // 语音模板
  const [voiceOption, setVoiceOption] = useState([])
  // 语音选择弹窗是否出现
  const [voiceVisible, setVoiceVisible] = useState(false)
  const [voiceValue, setVoiceValue] = useState()

  // 查看绘本的具体内容
  const [picBookDetail, setPicBookDetail] = useState({})
  // 当前显示页面
  const [currentIndex, setCurrentIndex] = useState(0);

  // 当前页码内容
  const [currentPage, setCurrentPage] = useState({})

  // 获取绘本的语音模板列表，及内容
  useEffect(async () => {
    if (record?.id) {
      setLoading(true)
      setVoiceOption(record?.voice_template?.map((item) => {
        return { label: `${item.title}·${item.language}·${item.tts_model}`, value: item?.id }
      }))
      if (record?.voice_template?.length > 0) {
        setVoiceValue(record?.voice_template?.[0].id)
      }
      // 获取书籍明细
      let result = await picBookPreviewMeta({ id: record?.id })

      // 增加声音取值映射
      result['voice_files_map'] = result?.voice_files.reduce((acc, item) => {
        acc[`${item.voice_template}_${item.para_content_uniq}`] = item?.voice_file;
        return acc;
      }, {});
      setPicBookDetail(result)

      if(result?.bookpage_set.length){
        setCurrentPage(result?.bookpage_set?.[0])
      }
      setLoading(false)
    }
  }, [record?.id])
  return (
    loading ?
      <>
        <Skeleton.Title animated /><Skeleton.Paragraph lineCount={5} animated />
      </> :
      <div style={{height: '95%'}}>
        {record?.voice_template?.length > 0 &&
          <div>
            发音模板:
            <a
              onClick={async () => {
                setVoiceVisible(true)
              }}
            >
              {voiceOption?.find((item => item.value === voiceValue))?.label}
            </a>
            <Picker
              columns={[
                voiceOption,
              ]}
              visible={voiceVisible}
              onClose={() => {
                setVoiceVisible(false)
              }}
              // value={voiceValue}
              onConfirm={v => {
                setVoiceValue(v[0])
              }}
            />
          </div>
        }
        {Object.keys(picBookDetail?.bookpage_set?.[currentIndex] || {}).length > 0 &&
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginTop: '5px'}}>
          <Row gutter={currentPage?.layout_cfg?.grid_gutter} align="stretch" style={{ height: '100%' }}>
            {JSON.parse(currentPage?.layout_cfg?.grid_row_col)?.map((item, index) => {
              // 对应的段落内容
              const c_para = currentPage?.paragraph?.[index] || {}
              const voice_key = `${voiceValue}_${c_para?.para_content_uniq}`

              // 控制高度
              let pic_height = '';
              let content_height = '';
              let fontSize = currentPage?.layout_cfg?.font_size || 14;

              if(JSON.parse(currentPage?.layout_cfg?.grid_row_col)?.length == 1){
                pic_height = '50%';
                content_height = '50%';
                fontSize = fontSize * 2
              }
              else {
                pic_height = '92%';
                content_height = '8%'
              }

              return <Col span={item}>
                <div style={{
                  fontFamily: currentPage?.layout_cfg?.font_family || 'Arial',
                  fontSize: currentPage?.layout_cfg?.font_size || 14,
                  color: currentPage?.layout_cfg?.font_color || 'black',
                  backgroundImage: `url(${c_para?.illustration})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: currentPage?.layout_cfg?.text_opacity || 1,
                  height: pic_height,
                  // marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: currentPage?.layout_cfg?.text_flex_align || 'center',
                  justifyContent: currentPage?.layout_cfg?.text_flex_justify || 'center'
                }} />
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: currentPage?.layout_cfg?.font_family || 'Arial',
                  fontSize: fontSize,
                  color: currentPage?.layout_cfg?.font_color || 'black',
                  height: content_height
                }}>
                  {/* <div style={{height: '10%'}}> */}
                  <SoundOutline
                    style={{marginRight: '15px', fontSize: '20px', color: 'blue'}}
                    hidden={!picBookDetail?.voice_files_map?.[voice_key]}
                    onClick={()=>{
                      const audio = new Audio(picBookDetail?.voice_files_map?.[voice_key]);
                      audio.play().catch(error => {
                        console.error('音频播放失败:', error);
                      });
                  }}
                  />
                  {c_para?.para_content}
                </div>
              </Col>
            })}
          </Row>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
              <Space wrap align='center'>
                <Button size='mini' onClick={() => {
                    setCurrentIndex(currentIndex - 1)
                    setCurrentPage(picBookDetail?.bookpage_set?.[currentIndex - 1])
                  }} disabled={currentIndex == 0}><LeftOutline /> 向左翻页</Button>
                <span>{currentIndex + 1}/{picBookDetail?.bookpage_set?.length}</span>
                <Button size='mini' onClick={() => {
                    setCurrentIndex(currentIndex + 1)
                    setCurrentPage(picBookDetail?.bookpage_set?.[currentIndex + 1])
                  }} disabled={currentIndex == picBookDetail?.bookpage_set?.length - 1}>向右翻页 <RightOutline /></Button>
              </Space>
            </div>
          </div>
        }
      </div>
  )
};

export default MobilePreviewContent;
