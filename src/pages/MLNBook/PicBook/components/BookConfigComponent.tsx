import React from 'react';
import {ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-form';
import {PicBookGradeOptions, PicBookLanguageOptions, PicBookPhaseOptions} from "@/pages/MLNBook/constant";


const BookConfigComponent: React.FC = (props) => {
    return (
        <>
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
        </>
    );
};

export default BookConfigComponent;
