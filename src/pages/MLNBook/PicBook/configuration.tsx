import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {
    ProCard,
    ProForm, ProFormGroup,
    ProFormList,
    ProFormText,
} from '@ant-design/pro-components';
import {ProFormSelect, ProFormTextArea} from "@ant-design/pro-form";
import {PicBookGradeOptions, PicBookLanguageOptions, PicBookPhaseOptions} from "@/pages/MLNBook/constant";

const PicBookConfigComponent: React.FC = (props) => {
    const {id} = props?.location?.query
    return (
        <PageContainer title={false}>
            <ProCard>
                <ProForm
                    layout="horizontal"
                    onFinish={async (values) => {
                        console.log(values);
                        return true;
                    }}
                >
                    <ProFormGroup>
                        <ProFormText
                            style={{padding: 0}}
                            width="md"
                            name="title"
                            label="书名"
                            placeholder={'输入绘本名称'}
                            // rules={[{required: true}]}
                        />
                        <ProFormSelect
                            label='语言'
                            width="md"
                            name="language"
                            placeholder={'选择绘本语言'}
                            options={PicBookLanguageOptions}
                        />
                        <ProFormSelect
                            label='学段'
                            width="md"
                            name="phase"
                            placeholder={'选择绘本学段'}
                            options={PicBookPhaseOptions}
                        />
                        <ProFormSelect
                            label='年级'
                            width="md"
                            name="phase"
                            placeholder={'选择绘本年级'}
                            options={PicBookGradeOptions}
                        />
                        <ProFormTextArea
                            style={{padding: 0}}
                            width="md"
                            name="description"
                            label="描述"
                        />
                    </ProFormGroup>
                    <ProFormList
                        name="paragraph"
                        label="章节"
                        creatorButtonProps={{
                            creatorButtonText: '添加章节',
                        }}
                        min={1}
                        copyIconProps={false}
                        itemRender={({listDom, action}, {index}) => (
                            <ProCard
                                bordered
                                style={{marginBlockEnd: 8}}
                                title={`章节${index + 1}`}
                                extra={action}
                                bodyStyle={{paddingBlockEnd: 0}}
                            >
                                {listDom}
                            </ProCard>
                        )}
                        creatorRecord={{name: '', items: [{name: ''}]}}
                        initialValue={[
                            {name: '颜色', items: [{name: '红'}, {name: '黄'}]},
                        ]}
                    >
                        <ProFormSelect
                            style={{padding: 0}}
                            width="md"
                            name="chapter"
                            label="章节模板"
                            placeholder={'选择章节模板'}
                            options={[
                                {'label': '章节模板1', value: 1},
                                {'label': '章节模板2', value: 2},
                                {'label': '章节模板3', value: 3},
                            ]}
                        />
                        <ProForm.Item isListField style={{marginBlockEnd: 0}} label="段落内容">
                            <ProFormList
                                name="items"
                                creatorButtonProps={{
                                    creatorButtonText: '新建',
                                    icon: false,
                                    type: 'link',
                                    style: {width: 'unset'},
                                }}
                                min={1}
                                copyIconProps={false}
                                deleteIconProps={{tooltipText: '删除'}}
                                itemRender={({listDom, action}) => (
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            marginInlineEnd: 25,
                                        }}
                                    >
                                        {listDom}
                                        {action}
                                    </div>
                                )}
                            >
                                <ProFormText allowClear={false} width="xs" name={['name']}/>
                            </ProFormList>
                        </ProForm.Item>
                    </ProFormList>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
};

export default PicBookConfigComponent;
