import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import { ProCard } from '@ant-design/pro-components';
import {List, Image} from 'antd';
import {history} from "@@/core/history";
import {DeleteOutlined} from '@ant-design/icons';


const PicBookComponent: React.FC = () => {

    const data = [
        {
            id: 1,
            title: '示例绘本1',
            graph_cnt: 4,
            kpoint_cnt: 16,
            description: 'Description for Card 1',
            cover_img: 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/06/a4/1f06a40d-7e6a-ee11-a31f-c4eff1cf3464/source/1024x1024bb.jpg'
        },
        {
            id: 2,
            title: '示例绘本2',
            graph_cnt: 2,
            kpoint_cnt: 8,
            description: 'Description for Card 2',
            cover_img: 'https://img2.baidu.com/it/u=1450232069,2600889240&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=771'
        },
        {
            id: 3,
            title: '示例绘本3',
            graph_cnt: 1,
            kpoint_cnt: 16,
            description: 'Description for Card 3',
            cover_img: 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/06/a4/1f06a40d-7e6a-ee11-a31f-c4eff1cf3464/source/1024x1024bb.jpg'
        },
        {
            id: 4,
            title: '示例绘本4',
            graph_cnt: 4,
            kpoint_cnt: 16,
            description: 'Description for Card 4',
            cover_img: 'https://img2.baidu.com/it/u=1450232069,2600889240&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=771'
        },
    ];

  return (
    <PageContainer title={false}>
      <List
          grid={{ gutter: 16}}
          dataSource={data}
          renderItem={(item) => (
              <List.Item>
                  <ProCard
                      title={
                          <a
                              onClick={() => {
                                  history.push({
                                      pathname: './mlnbook/pic_book/config/',
                                      query: {
                                          id: item.id
                                      }
                                  })
                              }}
                          >{item.title}</a>
                      }
                      type="inner"
                      style={{width: 300, height: 350}}
                      extra={
                          <DeleteOutlined style={{color: "red"}}/>
                      }
                  >
                      <Image src={item.cover_img} preview={false} width={240} height={240}/>
                      <p>含{item.graph_cnt}个段落，{item.kpoint_cnt}个知识点</p>
                  </ProCard>
              </List.Item>
          )}
      />
    </PageContainer>
  );
};

export default PicBookComponent;
