import React, { useEffect, useRef, useState } from 'react'
import { Card, Toast, Button, NavBar, TabBar, Icon, Badge, Grid } from 'antd-mobile'
import {picBookList} from "@/services/mlnbook/pic_book/api";
import {
  AppOutline,
  AntOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  RightOutline,
  UserOutline,
} from 'antd-mobile-icons'
import '../mobile.css'; // 引入样式文件
import MobilePreviewContent from './MobilePreviewContent';


/**
 * 移动端显示组件
 * @param props
 * @returns
 */
const MobileComponent: React.FC = () => {
  // 区分是否进入详情页
  const [isDetailPage, setIsDetailPage] = useState(false)
  // 首页显示的内容
  const [picBookData, setPicBookData] = useState([])

  // 存储当前查看绘本的信息
  const [currentRow, setCurrentRow] = useState({});

  // 进入首页获取书籍列表
  useEffect(async () => {
    const result = await picBookList({})
    setPicBookData(result)
  }, [])


  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return <div
    style={{
      height: '100%',
      display: "flex",
      flexDirection: "column"
    }}
  >
    <NavBar
      mode="dark"
      icon={isDetailPage ? <Icon type="left" /> : null} // 根据是否是详情页决定是否显示返回按钮
      onLeftClick={() => {
        setIsDetailPage(false)
        setCurrentRow({})
      }}
      backArrow={isDetailPage}
      onBack={()=>{
        setIsDetailPage(false)
        setCurrentRow({})
      }}
      rightContent={<Icon key="0" type="search" style={{ marginRight: '16px' }} />}
      style={{backgroundColor: '#e6e6e6'}}
    >
      {isDetailPage ? `${currentRow?.title}-预览` : '首页'}
    </NavBar>
    {/* 内容区域 */}
    <div style={{ margin: '5px', flex: 1, overflow: 'auto' }}>
    {/* 首页 */}
    {!isDetailPage &&
      <Grid columns={2} gap={4}>
        {picBookData.map((book) => (
          <Grid.Item key={book.id}>
            <div className={'grid-demo-item-block'}>
              <img src={book.cover_img} alt="封面图" className={'cover-image'} />
              <h3>
                <a
                  onClick={()=>{
                    setIsDetailPage(true)
                    setCurrentRow(book)
                  }}
                >{book.title}</a>
                </h3>
              {/* 其他书籍信息展示 */}
            </div>
          </Grid.Item>
        ))}
      </Grid>
    }
    {isDetailPage &&
      <MobilePreviewContent
        record={currentRow}
      />
    }
    </div>
    <TabBar
      safeArea
      style={{ marginTop: 'auto', backgroundColor: '#e6e6e6' }}
      onChange={(tab) => {
        if (tab === 'personalCenter') {
          Toast.show('点击了我的tab');
        }
      }}
    >
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  </div>
};

export default MobileComponent;
