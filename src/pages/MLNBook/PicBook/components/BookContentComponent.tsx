/**
 * 书本内容编辑组件
 */
import React, {useEffect, useState} from 'react';
import {Dropdown, Menu, message, Popconfirm, Spin, Tabs, Tooltip, Tree} from 'antd';
import {PageContainer} from '@ant-design/pro-components';
import {picBookMeta} from '@/services/mlnbook/pic_book/api';
import {EditOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import TabPane from 'antd/lib/tabs/TabPane';
import {deleteBookChapter, picBookMenuMeta, picBookSortMenu} from '@/services/mlnbook/pic_book/page_api';
import BookPageComponent from './BookPageComponent';
import {layoutList} from '@/services/mlnbook/layout_api';
import {
    dashMenuDragParams,
    dragHandler,
    fetchTreeFirstLeaf,
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
  const [selectPage, setSelectPage] = useState({})

  // 选中的目录
  const [selectMenu, setSelectMenu] = useState({})

  // 获取页面模板原始数据
  const [layoutOriginData, setLayoutOriginData] = useState(async () => {
    const result = await layoutList()
    setLayoutOriginData(result)
  })

  // 刷新目录
  const refreshMenu = async () => {
    setMenuLoading(true)
    // 1、获取目录数据
    const result = await picBookMenuMeta({ id: id })
    // 2、获取绘本目录的第一页
    const first_page = fetchTreeFirstLeaf(result)
    // 设置初始值
    setSelectPage(first_page)
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
                        if (info?.node?.id == selectPage?.page_id || menuLoading) return;
                        setSelectMenu(info?.node?.key)
                        if (info?.node?.isLeaf) {
                          setSelectPage({ page_id: info?.node?.id, parent: info?.node?.parent })
                        }
                      }}
                      selectedKeys={[`leaf_${selectPage?.page_id}`]}
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
                        if(!validParams(params)){
                          return
                        }
                        setMenuLoading(true)
                        const result = await picBookSortMenu(params)
                        if(result.length > 0){
                          message.success('修改成功')
                          await refreshMenu()
                        }
                        setMenuLoading(false)

                      }}
                      titleRender={(info) => {
                        return [
                          // info?.isLeaf ? info?.title : `章节${info?.seq}: ${info?.title}`,
                          info?.title,
                          <span
                            style={{ marginLeft: 5 }}
                          >
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Menu.Item
                                  onClick={()=>{
                                    setEditMenu(info)
                                    setShowMenuModal(true)
                                  }}
                                  >
                                    修改章节
                                  </Menu.Item>
                                  <Menu.Item
                                  >
                                    <Popconfirm
                                      key={'delete'}
                                      title='确定删除该章节吗？'
                                      onConfirm={async () => {
                                        try {
                                          await deleteBookChapter({id: info?.key})
                                          await refreshMenu()
                                          message.success('删除成功')
                                        } catch (error) {
                                          message.error('删除失败')
                                        }

                                      }}
                                    >
                                      删除章节
                                    </Popconfirm>
                                  </Menu.Item>
                                </Menu>
                              }
                              placement='bottomLeft'
                              arrow
                            >
                              <a style={{marginLeft: 10}}><EditOutlined hidden={info?.isLeaf}/></a>
                              {/* <EditOutlined hidden={selectMenu != info?.key || info?.isLeaf}/> */}
                            </Dropdown>
                          </span>
                        ]
                      }}
                      expandAction={'doubleClick'}
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
        {selectPage?.page_id &&
          <BookPageComponent
            picBookId={id}
            selectPage={selectPage}
            setSelectPage={setSelectPage}
            configData={configData}
            // setKpointOptionsData={setKpointOptionsData}
            // kpointOptionsData={kpointOptionsData}
            layoutOriginData={layoutOriginData}
            refreshMenu={refreshMenu}
            layoutOptionsData={formatLayoutOptions(layoutOriginData)}
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
          layoutOriginData={layoutOriginData}
          layoutOptionsData={formatLayoutOptions(layoutOriginData)}
          refreshMenu={refreshMenu}
        />
      }
    </PageContainer>
  );
};

export default BookContentConfigComponent;
