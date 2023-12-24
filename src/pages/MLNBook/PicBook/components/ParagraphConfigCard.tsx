import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormList,
  ProFormGroup,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { addBookPage, addChapter, picBookChapterPageParagraphMeta, updateBookPage, updateChapter } from '@/services/mlnbook/picbook_api';
import { ProCard } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { generateMD5 } from '../../utils';


/**
 * 章节内容配置模块
 * @param props
 * @returns
 */
const ParagraphConfigCard: React.FC = (props) => {
  // 用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const { picBookId, chapterPageParagraph, kpointOptionsData, layoutOptionsData, setChapterPageParagraph } = props
  const [loading, setLoading] = useState(false)

  // 控制页面编辑处理
  const [currentPage, setCurrentPage] = useState({})
  const [showPageModal, setShowPageModal] = useState(false)
  return <div>
    <ProCard
      loading={loading}
      title={`章节：${chapterPageParagraph?.title}`}
      direction="column"
      extra={
        <a onClick={() => {
          setCurrentPage({})
          setShowPageModal(true)
        }}>
          新增页面
        </a>
      }
      subTitle={`排序:${chapterPageParagraph?.seq}`}
      style={{ marginTop: 5 }}
    >
      {
        chapterPageParagraph?.bookpage_set?.map((pageData, index) => {
          return <ProCard
            bordered
            style={{ marginTop: 5 }}
            extra={
              <Space>
                <a onClick={() => { console.log('新增页面') }}>
                  编辑
                </a>
                <a onClick={() => { console.log('新增页面') }}>
                  删除
                </a>
              </Space>
            }
            style={{ width: '90%' }}
            title={`page_${pageData?.id}(排序${pageData?.page_num})`}

          >
            <ProForm
              layout="horizontal"
              initialValues={pageData || {}}
              submitter={{
                render: (_, dom) => {
                  return <div
                    style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 20 }}
                  >
                    <Space>
                      <Button type='primary' htmlType='submit'>保存</Button>
                    </Space>
                  </div>;
                },
              }}
              onFinish={async (values) => {
                values['id'] = pageData?.id
                values['chapter'] = pageData?.chapter
                values['page_num'] = pageData?.page_num
                values['pic_book'] = picBookId
                values['user'] = currentUser?.user
                values['paragraphs'] = values['paragraphs']?.map((item)=>{
                  if(!item.para_content_uniq){
                    item.para_content_uniq = generateMD5(item['para_content'])
                  }
                  return item
                })
                const result = await updateBookPage(values)
                console.log(result)
                return true;
              }}
            >
              <ProFormSelect
                rules={[{ required: true }]}
                width="md"
                label='页面模板'
                name="layout"
                options={layoutOptionsData}
              />
              <ProFormList
                name="paragraphs"
                rules={[{ required: true }]}
                label="段落"
                creatorButtonProps={{
                  creatorButtonText: '添加段落',
                }}
                min={1}
                copyIconProps={false}
                itemRender={({ listDom, action }, { index }) => (
                  <ProCard
                    bordered
                    style={{ marginBlockEnd: 8 }}
                    title={`段落${index + 1}`}
                    extra={action}
                    bodyStyle={{ paddingBlockEnd: 0 }}
                  >
                    {listDom}
                  </ProCard>
                )}
                creatorRecord={{ book_page: pageData?.id }}
                initialValue={[
                ]}
              >
                <ProFormGroup>
                  <ProFormTextArea
                    rules={[{ required: true }]}
                    // width="md"
                    width={250}
                    name="para_content"
                    label="段落内容"
                  />
                  <ProFormSelect
                    rules={[{ required: true }]}
                    // width="md"
                    width={200}
                    name="knowledge_point"
                    label="知识点"
                    options={kpointOptionsData}
                  />
                  <a><PlusOutlined/>新建知识点</a>
                </ProFormGroup>
              </ProFormList>
            </ProForm>

          </ProCard>
        })
      }
    </ProCard>
    {showPageModal &&
      <ModalForm
        title={currentPage?.id ? `编辑页面:${currentPage?.id}` : '新建页面'}
        width="600px"
        layout="horizontal"
        visible={showPageModal}
        initialValues={currentPage || {}}
        onVisibleChange={setShowPageModal}
        onFinish={async (value) => {
          let result;
          value['user'] = currentUser?.user
          if (currentPage?.id) {
            value['id'] = currentPage?.id
            result = await updateBookPage(value)
          }
          else {
            // 新建时绑定到pic_book及chapter上
            value['chapter'] = chapterPageParagraph?.id
            const maxSeq = chapterPageParagraph?.bookpage_set.length;
            value['page_num'] = maxSeq + 1
            value['paragraphs'] = []
            value['pic_book'] = picBookId
            result = await addBookPage(value)
          }
          if (result) {
            setShowPageModal(false);
            setLoading(true)
            const result = await picBookChapterPageParagraphMeta({ id: picBookId })
            setChapterPageParagraph(result)
            setLoading(false)
          }
        }}
      >
        <ProFormSelect
          rules={[{ required: true }]}
          labelCol={{ span: 4 }}
          width="md"
          label="页面模板"
          name="layout"
          options={layoutOptionsData}
        />
      </ModalForm>
    }
  </div>
};

export default ParagraphConfigCard;
