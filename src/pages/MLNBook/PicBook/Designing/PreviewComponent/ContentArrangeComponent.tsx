/**
 * 内容编排组件，根据传入的段落内容，组织页面布局填充内容
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Space, Spin, Tag } from 'antd';
import ProForm from '@ant-design/pro-form';
import ContentCard from './ContentCard';
import { formatLayoutMap } from '../utils';
const { CheckableTag } = Tag;


/**
 * 根据当前设置的布局列表，确定当前的选中的段落内容数量
 * @param data
 * @param layoutData
 * @returns
 */
export const getParaCount = (relation_data, layoutOriginData) =>{
  let cnt = 0
  const layoutMap = formatLayoutMap(layoutOriginData)
  relation_data?.forEach((item)=>{
      cnt += JSON.parse(layoutMap?.[item]?.grid_row_col)?.length
  })
  return cnt
}

export const ContentArrangeComponent: React.FC = (props) => {
  const { chapterParaData, layoutOptionsData, layoutOriginData} = props
  // 布局内容设置, 数组格式，每个里边携带布局模板，根据布局模板确定已排版的段落
  const [paraLayoutRelation, setParaLayoutRelation] = useState([1, 2])
  // 段落的tag数据
  const paraTagsData = chapterParaData?.paragraph?.map(item => item?.knowledge) || [];
  // 已配置页面布局的段落
  const [selectPara, setSelectPara] = useState([])

  const [loading, setLoading] = useState(false)

  // 刷新选中的段落
  const refreshSelectTagFunc = () => {
    const tmp = paraTagsData?.slice(0, getParaCount(paraLayoutRelation, layoutOriginData))
    setSelectPara(tmp)
  }

  // paraLayoutRelation 有变化时，更新选中的段落
  useEffect(() => {
    refreshSelectTagFunc()
  }, [paraLayoutRelation])


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
        {paraLayoutRelation?.map((item, index)=>{
          return <Col span={8}>
          <ContentCard
            chapterParaData={chapterParaData}
            layoutOriginData={layoutOriginData}
            layoutOptionsData={layoutOptionsData}
            layoutTemplateId={item}
            index={index}
            setLoading={setLoading}
            refreshSelectTagFunc={refreshSelectTagFunc}
            paraLayoutRelation={paraLayoutRelation}
            setParaLayoutRelation={setParaLayoutRelation}
          />
        </Col>

        })}
      </Row>
      </div>
  </Spin>
};

export default ContentArrangeComponent;
