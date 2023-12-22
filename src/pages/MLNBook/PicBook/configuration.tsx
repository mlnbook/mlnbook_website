import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {
    ProCard,
    ProForm, ProFormGroup,
    ProFormList,
    ProFormText,
    StepsForm
} from '@ant-design/pro-components';
import {Button, message, Space, Steps} from 'antd';
import {ProFormSelect, ProFormTextArea} from "@ant-design/pro-form";
import {PicBookGradeOptions, PicBookLanguageOptions, PicBookPhaseOptions} from "@/pages/MLNBook/constant";
import BookConfigComponent from "@/pages/MLNBook/PicBook/components/BookConfigComponent";

const PicBookConfigComponent: React.FC = (props) => {
    const {id} = props?.location?.query
    return (
        <PageContainer title={false}>
            <ProCard>
                <StepsForm<{
                    name: string;
                }>
                    onFinish={async (values) => {
                        console.log(values);
                        message.success('提交成功');
                    }}
                    formProps={{
                        validateMessages: {
                            required: '此项为必填项',
                        },
                    }}
                    submitter={{
                        render: (props) => {
                            if (props.step === 0) {
                                return (
                                    <Space>
                                        <Button onClick={() => props.onSubmit?.()}>
                                            下一步
                                        </Button>
                                        <Button type="primary" onClick={() => props.onSubmit?.()}>
                                            保存并进行下一步
                                        </Button>
                                    </Space>
                                );
                            }

                            if (props.step === 1) {
                                return [
                                    <Button key="pre" onClick={() => props.onPre?.()}>
                                        返回第一步
                                    </Button>,
                                    <Button
                                        type="primary"
                                        key="goToTree"
                                        onClick={() => props.onSubmit?.()}
                                    >
                                        去第三步 {'>'}
                                    </Button>,
                                ];
                            }

                            return [
                                <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                                    {'<'} 返回第二步
                                </Button>,
                                <Button
                                    type="primary"
                                    key="goToTree"
                                    onClick={() => props.onSubmit?.()}
                                >
                                    提交 √
                                </Button>,
                            ];
                        },
                    }}
                >
                    <StepsForm.StepForm<{
                        name: string;
                    }>
                        name="base"
                        title="创建绘本"
                        onFinish={async ({ name }) => {
                            console.log(name, '创建绘本成功');
                            return true;
                        }}
                    >
                        <BookConfigComponent/>
                    </StepsForm.StepForm>
                    <StepsForm.StepForm<{
                        checkbox: string;
                    }>
                        name=""
                        title="创建章节"
                    >
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
                    </StepsForm.StepForm>
                    <StepsForm.StepForm name="time" title="创建段落">
                        <ProFormSelect
                            label="部署分组策略"
                            name="remark"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue="1"
                            options={[
                                {
                                    value: '1',
                                    label: '策略一',
                                },
                                { value: '2', label: '策略二' },
                            ]}
                        />
                        <ProFormSelect
                            label="Pod 调度策略"
                            name="remark2"
                            initialValue="2"
                            options={[
                                {
                                    value: '1',
                                    label: '策略一',
                                },
                                { value: '2', label: '策略二' },
                            ]}
                        />
                    </StepsForm.StepForm>
                </StepsForm>
            </ProCard>
        </PageContainer>
    );
};

export default PicBookConfigComponent;
