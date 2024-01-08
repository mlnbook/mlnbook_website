import React from 'react';
import { Col, Row } from 'antd';

import {Button} from 'antd-mobile'
// import { Grid } from 'antd-mobile'


const BookPreviewComponent: React.FC = (props) => {
  // return <div>xx</div>
  const {chapterParaData, page_layout} = props
  return <div
    style={{
      width: '414px',
      height: '896px',
      border: '1px dashed gray',
      backgroundImage:  `url(${page_layout?.background_img})`,
      backgroundColor: page_layout?.background_color
    }}
  >
    {/* <Button>查看更多</Button> */}
    <Row gutter={page_layout?.grid_gutter} align="stretch" style={{height: '100%'}}>
      {JSON.parse(page_layout?.grid_row_col)?.map((item, index)=>{
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: page_layout?.text_flex_align || 'center',
                  justifyContent: page_layout?.text_flex_justify || 'center'
                }}>
                  {c_para?.para_content}
                </div>
              </Col>
      })}
    </Row>
  </div>
};

export default BookPreviewComponent;
