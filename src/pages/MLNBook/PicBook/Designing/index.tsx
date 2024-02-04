/**
 * 书本内容编辑组件
 */
import React, {useEffect, useState} from 'react';
import {Dropdown, Menu, message, Popconfirm, Spin, Tabs, Tooltip, Tree} from 'antd';
import {PageContainer} from '@ant-design/pro-components';
import {picBookMeta} from '@/services/mlnbook/pic_book/api';
import {EditOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import TabPane from 'antd/lib/tabs/TabPane';
import {deleteBookChapter, picBookChapterMenuMeta, picBookMenuMeta, picBookSortMenu} from '@/services/mlnbook/pic_book/page_api';
import BookParaComponent from './BookParaComponent';
import {layoutList} from '@/services/mlnbook/layout_api';
import {
    dashMenuDragParams,
    dragHandler,
    fetchTreeFirstLeaf,
    fetchTreeFirstNode,
    formatLayoutOptions,
    validParams,
    validTreeDrag
} from './utils';
import BookDirectionModal from './BookDirectionModal';


const BookContentConfigComponent: React.FC = (props) => {
  // 提取参数
  const { id } = props?.location?.query
  const [configData, setConfigData] = useState({})
  // 侧边栏状态
  const [dirCollapsed, setDirCollapsed] = useState(false)

  // 目录编辑弹窗
  const [showMenuModal, setShowMenuModal] = useState(false)
  // 编辑的目录信息
  const [editMenu, setEditMenu] = useState({})

  // 目录加载状态
  const [menuLoading, setMenuLoading] = useState(false)

  // 目录数据
  const [menuData, setMenuData] = useState([])

  // 选中的页面
  const [selectChapter, setSelectChapter] = useState({})

  // 获取页面模板原始数据
  const [layoutOriginData, setLayoutOriginData] = useState(async () => {
    const result = await layoutList({})
    setLayoutOriginData(result)
  })

  // 刷新目录
  const refreshMenu = async () => {
    setMenuLoading(true)
    // 1、获取目录数据
    const result = await picBookChapterMenuMeta({ id: id })
    // 2、获取绘本目录的第一页
    const first_chapter = fetchTreeFirstNode(result)
    // 设置初始值
    setSelectChapter(first_chapter)
    setMenuData(result)
    setMenuLoading(false)
  }

  // 进入时加载目录
  useEffect(async () => {
    if (id) {
      await refreshMenu()
      // 加载书籍信息
      setMenuLoading(true)
      const result = await picBookMeta({ id: id })
      setConfigData(result)
      setMenuLoading(false)
    }
  }, [id])
  return (
    <PageContainer title={false} pageHeaderRender={false}>
      <div
        style={{
          width: dirCollapsed ? 40 : 260,
          position: "fixed",
          top: "68px",
          bottom: 0,
          background: "#ffffff"
        }}
      >
        {/* 目录区域 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <Tabs
            defaultActiveKey='default'
            style={{
              flex: 1,
              overflow: "scroll",
              margin: "0 8px",
            }}
            tabBarExtraContent={{
              right: <a onClick={
                ()=>{
                  setEditMenu({})
                  setShowMenuModal(true)
                }
              }>添加</a>
            }}
          >
            <TabPane
              // tab={`《${configData?.title?.length > 20 ? configData?.title?.slice(0, 20) + '...' : configData?.title} 》目录`}
              tab={`目录`}
              key='default'
              style={{ color: 'black' }}
            >
              {
                !menuLoading ? (
                  Object.keys(menuData).length > 0 ?
                    <Tree
                      showLine
                      defaultExpandAll
                      onSelect={(item, info) => {
                          setSelectChapter({ chapter_id: info?.node?.id, chapter_title: info?.node?.title, parent: info?.node?.parent })
                      }}
                      // selectedKeys={[`${selectChapter?.chapter_id}`]}
                      defaultSelectedKeys={[selectChapter?.chapter_id]}
                      draggable={{
                        icon: false
                      }}
                      onDrop={async (info) =>{
                        const verifyResult = validTreeDrag(info)
                        if(!verifyResult?.canDrag){
                          if(verifyResult?.errMsg){
                            message.error(verifyResult?.errMsg)
                            return
                          } else {
                            return
                          }
                        }
                        const data = dragHandler(info, menuData)
                        const params = dashMenuDragParams(info, data)
                        setMenuLoading(true)
                        const result = await picBookSortMenu(params)
                        if(result.length > 0){
                          message.success('修改成功')
                          await refreshMenu()
                        }
                        setMenuLoading(false)

                      }}
                      treeData={menuData}
                    /> : "暂无数据"
                ) : <Spin spinning={true}>目录加载中</Spin>
              }

            </TabPane>
          </Tabs>
          <div
            style={{
              height: "39px",
              justifyContent: "center",
              alignItems: 'center',
              display: 'flex'
            }}
            onClick={(e) => { setDirCollapsed(!dirCollapsed) }}
          >
            {dirCollapsed ?
              <Tooltip title='展开' placement='right'><MenuUnfoldOutlined /></Tooltip> :
              <span><MenuFoldOutlined style={{ marginRight: 5 }} />收起</span>
            }
          </div>

        </div>
      </div>
      {/* page页面内容区域 */}
      <div
        style={{
          // minHeight: 800,
          // minWidth: 800,
          // marginTop: "5px",
          marginLeft: dirCollapsed ? 50 : 270
        }}
      >
        {selectChapter?.chapter_id &&
          <BookParaComponent
            picBookId={id}
            selectChapter={selectChapter}
            setSelectChapter={setSelectChapter}
            configData={configData}
            // setKpointOptionsData={setKpointOptionsData}
            // kpointOptionsData={kpointOptionsData}
            layoutOriginData={layoutOriginData || []}
            refreshMenu={refreshMenu}
            layoutOptionsData={formatLayoutOptions(Object.keys(layoutOriginData)?.length > 0?layoutOriginData:[])}
            setLayoutOriginData={setLayoutOriginData}
          />
        }
      </div>
      {/* 目录新增、编辑弹窗 */}
      {showMenuModal &&
        <BookDirectionModal
          setShowMenuModal={setShowMenuModal}
          showMenuModal={showMenuModal}
          setEditMenu={setEditMenu}
          editMenu={editMenu}
          picBookId={id}
          layoutOriginData={layoutOriginData || []}
          layoutOptionsData={formatLayoutOptions(Object.keys(layoutOriginData)?.length > 0?layoutOriginData:[])}
          refreshMenu={refreshMenu}
        />
      }
    </PageContainer>
  );
};

export default BookContentConfigComponent;
