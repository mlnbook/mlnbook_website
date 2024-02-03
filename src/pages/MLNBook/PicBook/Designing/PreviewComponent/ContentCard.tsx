/**
 * 根据传入的内容，布局，显示预览
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Space, Tag } from 'antd';
import { ModalForm, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { formatLayoutMap } from '../utils';
import CardTypesetModal from './CardTypesetModal';


/**
 * 根据当前模板的排序，获取取值的开始及结束索引
 * @param data
 * @param layoutData
 * @returns
 */
export const getParaContentIndex = (paraLayoutRelation, cur_index, layoutTemplateId, layoutMap) => {
  // 开始和结束的索引，用来slice截取段落
  let start = 0;
  let end = 0;
  if (cur_index > 0) {
    paraLayoutRelation?.forEach((item, index) => {
      if (index < cur_index) {
        start += JSON.parse(layoutMap?.[item]?.grid_row_col)?.length
      }
    })
  }
  end = start + JSON.parse(layoutMap?.[layoutTemplateId]?.grid_row_col)?.length
  return { start: start, end: end }
}

export const ContentCard: React.FC = (props) => {
  const {
      chapterParaData,
      layoutOriginData,
      layoutTemplateId,
      index,
      layoutOptionsData,
      paraLayoutRelation,
      setParaLayoutRelation,
      setLoading,
      currentTypeset,
      updateChapterParaDataFunc,
      refreshSelectTagFunc
    } = props
  // 显示切换显示模板
  const [showModal, setShowModal] = useState(false)

  // 模板id和内容的map映射
  const layoutMap = formatLayoutMap(layoutOriginData)
  const paraContentIndex = getParaContentIndex(paraLayoutRelation, index, layoutTemplateId, layoutMap)
  const page_layout = layoutMap?.[layoutTemplateId]
  const pageParagraph = chapterParaData?.paragraphs?.slice(paraContentIndex?.start, paraContentIndex?.end)

  return <div>
    <ProCard
      title={`页面${index + 1}`}
      bordered
      extra={
        <Space>
          <a
          hidden={currentTypeset?.c_type == 'norm'}
          onClick={() => {
            setShowModal(true)
          }}>
            切换
          </a>
        </Space>
      }
    >
      <div
        style={{
          height: '350px',
          border: '1px dashed gray',
          backgroundImage: `url(${page_layout?.background_img})`,
          backgroundColor: page_layout?.background_color
        }}
      >
        {/* <Button>查看更多</Button> */}
        <Row gutter={page_layout?.grid_gutter} align="stretch" style={{ height: '100%' }}>
          {JSON.parse(page_layout?.grid_row_col)?.map((item, index) => {
            // 对应的段落内容
            const c_para = pageParagraph?.[index] || {}
            // 控制高度
            let pic_height = '';
            let content_height = '';
            let fontSize = page_layout?.font_size || 14;

            if (JSON.parse(page_layout?.grid_row_col)?.length == 1) {
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
                fontFamily: page_layout?.font_family || 'Arial',
                fontSize: page_layout?.font_size || 14,
                color: page_layout?.font_color || 'black',
                backgroundImage: `url(${c_para?.illustration})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: page_layout?.text_opacity || 1,
                height: pic_height,
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
                fontSize: fontSize,
                color: page_layout?.font_color || 'black',
                height: content_height
              }}>
                {c_para?.para_content}
              </div>
            </Col>
          })}
        </Row>
      </div>
    </ProCard>
    {showModal &&
      <CardTypesetModal
        showTypesetModal={showModal}
        setShowTypesetModal={setShowModal}
        updateChapterParaDataFunc={updateChapterParaDataFunc}
        refreshSelectTagFunc={refreshSelectTagFunc}
        typesetData={currentTypeset?.chapter_typesets?.find((item => item.chapter == chapterParaData?.chapter?.id))}
        layoutOptionsData={layoutOptionsData}
        index={index}
      />
    }
  </div>

};

export default ContentCard;
