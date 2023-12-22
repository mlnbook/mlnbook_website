import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {ProCard} from '@ant-design/pro-components';
import {List, Image, Button, Tooltip} from 'antd';
import {history} from "@@/core/history";
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {picBookList} from "@/services/mlnbook/api";


const PicBookComponent: React.FC = () => {
    // 指标数据，不包含虚拟指标
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await picBookList()
        setData(result)
    }, [])

    return (
        <PageContainer title={false}>
            <List
                grid={{gutter: 16}}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <ProCard
                            title={
                                <a
                                    onClick={() => {
                                        history.push({
                                            pathname: '/mlnbook/pic_book/config/',
                                            query: {
                                                id: item.id
                                            }
                                        })
                                    }}
                                >{item.title}</a >
                            }
                            type="inner"
                            style={{width: 300, height: 350}}
                            extra={
                                <DeleteOutlined style={{color: "red"}}/>
                            }
                        >
                            <Image
                                src={item.cover_img || 'https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/06/a4/1f06a40d-7e6a-ee11-a31f-c4eff1cf3464/source/1024x1024bb.jpg'}
                                preview={false} width={240} height={240}/>
                            <Tooltip title={item.description} placement="bottom">
                                <p style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                    marginBottom: 0
                                }}>{item.description}</p >
                            </Tooltip>
                        </ProCard>
                    </List.Item>
                )}
            />
            <Button
                style={{
                    position: "fixed",
                    marginTop: 15,
                    bottom: 20,
                    right: 50,
                    zIndex: 9999,
                    height: 50,
                    width: 50,
                    overflow: "auto"
                }}
                onClick={() => {
                    history.push('/mlnbook/pic_book/config/')
                }}
                type={'primary'}
                shape={'circle'}
            ><PlusOutlined/></Button>
        </PageContainer>
    );
};

export default PicBookComponent;