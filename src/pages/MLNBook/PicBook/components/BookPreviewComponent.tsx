import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Spin } from 'antd';

import { Button } from 'antd-mobile'
import { paragraphVoiceListMeta } from '@/services/mlnbook/pic_book/voice_api';
import { SoundOutlined } from '@ant-design/icons';
// import { Grid } from 'antd-mobile'


const BookPreviewComponent: React.FC = (props) => {
  const audioRef = useRef(null);
  const { chapterParaData, page_layout } = props
  const [loading, setLoading] = useState(false)
  // 语音内容
  const [paraVoiceMapData, setParaVoiceMapData] = useState({})
  // 获取当前的语音信息
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const params = {
        pic_book: chapterParaData?.paragraph?.pic_book,
      };
      const result = await paragraphVoiceListMeta(params);
      const map_data = result.reduce((acc, item) => {
        acc[item.para_content_uniq] = item?.voice_file;
        return acc;
      }, {});
      setParaVoiceMapData(map_data)
      setLoading(false)
    };

    fetchData();
  }, [chapterParaData?.id]);
  return !loading &&
    <div
      style={{
        width: '414px',
        height: '896px',
        border: '1px dashed gray',
        backgroundImage: `url(${page_layout?.background_img})`,
        backgroundColor: page_layout?.background_color
      }}
    >
      {/* <Button>查看更多</Button> */}
      <Row gutter={page_layout?.grid_gutter} align="stretch" style={{ height: '100%' }}>
        {JSON.parse(page_layout?.grid_row_col)?.map((item, index) => {
          // 对应的段落内容
          const c_para = chapterParaData?.paragraph?.[index] || {}
          return <Col span={item}>
            <div style={{
              fontFamily: page_layout?.font_family || 'Arial',
              fontSize: page_layout?.font_size || 14,
              color: page_layout?.font_color || 'black',
              backgroundImage: `url(${c_para?.illustration})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: page_layout?.text_opacity || 1,
              height: '92%',
              // marginBottom: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: page_layout?.text_flex_align || 'center',
              justifyContent: page_layout?.text_flex_justify || 'center'
            }} />
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontFamily: page_layout?.font_family || 'Arial',
              fontSize: page_layout?.font_size || 14,
              color: page_layout?.font_color || 'black',
              height: '8%'
            }}>
              {/* <div style={{height: '10%'}}> */}
              {/* <SoundOutlined
              style={{marginRight: '15px', fontSize: '20px', color: 'blue'}}
              hidden={!paraVoiceMapData?.[c_para?.para_content_uniq]}
              onClick={()=>{
                const audio = new Audio(paraVoiceMapData?.[c_para?.para_content_uniq]);
                audio.play().catch(error => {
                  console.error('音频播放失败:', error);
                });
            }}
            /> */}
              {c_para?.para_content}
              {/* <audio controls ref={audioRef}>
              <source src={paraVoiceMapData?.[c_para?.para_content_uniq]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
            </div>
          </Col>
        })}
      </Row>
    </div>
};

export default BookPreviewComponent;
