/**
 * 内容编排组件，根据传入的段落内容，组织页面布局填充内容
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Space, Spin, Tag } from 'antd';
import ProForm from '@ant-design/pro-form';
import ContentCard from './ContentCard';
import { calcParaPages, formatLayoutMap, formatParaLayoutFunc } from '../utils';
import { ProCard } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import CardTypesetModal from './CardTypesetModal';
const { CheckableTag } = Tag;


export const ContentArrangeComponent: React.FC = (props) => {
  const {
    selectTypeset,
    chapterParaData,
    layoutOptionsData,
    layoutOriginData,
    updateChapterParaDataFunc
  } = props
  // 布局内容设置, 数组格式，每个里边携带布局模板，根据布局模板确定已排版的段落
  const currentTypeset = chapterParaData?.typeset_data?.find((item => item.id === selectTypeset));
  const [paraLayoutRelation, setParaLayoutRelation] = useState([])
  // 段落的tag数据
  const paraTagsData = chapterParaData?.paragraphs?.map(item => item?.knowledge) || [];
  // 已配置页面布局的段落
  const [selectPara, setSelectPara] = useState([])

  // 计算出所需要显示布局数
  const [pageLayoutList, setPageLayoutList] = useState([])

  // 显示布局的弹窗
  const [showTypesetModal, setShowTypesetModal] = useState(false)
  const [typesetData, setTypesetData] = useState({})

  const [loading, setLoading] = useState(false)
  // 刷新选中的段落
  const refreshSelectTagFunc = () => {
    setLoading(true)
    if (currentTypeset?.c_type == 'norm') {
      setParaLayoutRelation(currentTypeset?.setting || [])
      setSelectPara(paraTagsData)
      // 默认布局，计算出总的页面，直接显示
      const page_num = calcParaPages(paraTagsData, currentTypeset)
      const tmp = Array(page_num).fill(currentTypeset?.setting).flat();
      setPageLayoutList(tmp)
    }
    else {
      // 计算出所需要显示的page_layoutlist
      const cur_setting = currentTypeset?.chapter_typesets?.find((item => item.chapter == chapterParaData?.chapter?.id))?.setting || [];

      setParaLayoutRelation(cur_setting)
      const { select_cnt, format_layout } = formatParaLayoutFunc(cur_setting, layoutOriginData, paraTagsData)
      setSelectPara(paraTagsData?.slice(0, select_cnt))
      setPageLayoutList(format_layout)
    }
    setLoading(false)
  }

  // paraLayoutRelation以及选中的布局 有变化时，更新选中的段落
  useEffect(() => {
    refreshSelectTagFunc()
  }, [paraLayoutRelation, selectTypeset, chapterParaData?.chapter?.id, chapterParaData?.paragraphs])
  return <Spin spinning={loading}>
    <ProForm.Item
      label="已排版段落"
    >
      <Space size={[0, 8]} wrap>
        {paraTagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectPara.includes(tag)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
    </ProForm.Item>
    <div>
      <Row gutter={16}>
        {pageLayoutList?.map((item, index) => {
          return <Col span={8}>
            <ContentCard
              chapterParaData={chapterParaData}
              layoutOriginData={layoutOriginData}
              layoutOptionsData={layoutOptionsData}
              layoutTemplateId={item}
              index={index}
              currentTypeset={currentTypeset}
              setLoading={setLoading}
              refreshSelectTagFunc={refreshSelectTagFunc}
              paraLayoutRelation={paraLayoutRelation}
              setParaLayoutRelation={setParaLayoutRelation}
              updateChapterParaDataFunc={updateChapterParaDataFunc}
            />
          </Col>
        })}
        {currentTypeset?.c_type == 'custom' && selectPara?.length < paraTagsData?.length &&
          <Col span={8}>
            <ProCard
              title={<div>&nbsp;</div>}
              bordered
            >
              <div
                style={{
                  height: '350px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed gray',
                }}
              >
                <Button
                  type='primary'
                  onClick={() => {
                    setShowTypesetModal(true)
                    setTypesetData(currentTypeset?.chapter_typesets?.find((item => item.chapter == chapterParaData?.chapter?.id)))
                  }}
                >
                  <PlusOutlined />新建
                </Button>
              </div>
            </ProCard>
          </Col>
        }
      </Row>
      {
        showTypesetModal &&
        <CardTypesetModal
          showTypesetModal={showTypesetModal}
          setShowTypesetModal={setShowTypesetModal}
          refreshSelectTagFunc={refreshSelectTagFunc}
          updateChapterParaDataFunc={updateChapterParaDataFunc}
          typesetData={typesetData}
          layoutOptionsData={layoutOptionsData}
        />
      }
    </div>
  </Spin>
};

export default ContentArrangeComponent;
