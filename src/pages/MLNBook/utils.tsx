import * as CryptoJS from 'crypto-js';
import {formatLayoutMap} from "@/pages/MLNBook/PicBook/Designing/utils";
/**
 * 将字符串MD5加密
 * @param input
 * @returns
 */
export const generateMD5 = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};

/**
 * 生成唯一id
 */
export const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
  });
  return uuid
}


/**
 * 根据段落内容及布局模板，返回格式化后的页面列表
 * @param chapter_paragraphs
 * @param typeset
 * * @param typeset_value
 */
export const formatPreviewPageList = (chapter_paragraphs, typeset_data, typeset_value) => {
  let page_list = []
  let current_typeset;
  if (typeset_value != undefined) {
    current_typeset = typeset_data?.find((item => item.id == typeset_value))
  }
  else {
    current_typeset = typeset_data?.[0] || {}
  }
  //  默认布局
  if (current_typeset?.c_type == 'norm') {
    const p_cnt = JSON.parse(current_typeset?.layout_cfg?.[0]?.grid_row_col)?.length
    chapter_paragraphs?.forEach((item) => {
      if (item?.paragraph_set?.length > 0) {
        const pages_cnt = Math.floor(item?.paragraph_set?.length / p_cnt + 0.5)
        for (let i = 0; i < pages_cnt; i += p_cnt) {
          page_list.push({
            paragraph: item?.paragraph_set?.slice(i, i + p_cnt),
            layout_cfg: current_typeset?.layout_cfg?.[0]
          })
        }
      }
    })
  }
  // 自定义布局
  else if (current_typeset?.c_type == 'custom') {
    // layout映射
    const layoutMap = formatLayoutMap(current_typeset?.layout_cfg)
    const chapterTypesetMap = current_typeset?.chapter_typesets?.reduce((accumulator, item) => {
      const key = item?.chapter;
      accumulator[key] = item;
      return accumulator;
    }, {})
    chapter_paragraphs?.forEach((chapter_item)=>{
      const relation_data = chapterTypesetMap?.[chapter_item?.id]?.setting || []
      const parasData = chapter_item?.paragraph_set || []
      let select_cnt = 0
      relation_data?.forEach((item) => {
        if (select_cnt < parasData?.length) {
          const l_cnt = JSON.parse(layoutMap?.[item]?.grid_row_col)?.length
          // 添加数据
          page_list.push({
            paragraph: parasData?.slice(select_cnt, select_cnt + l_cnt),
            layout_cfg: layoutMap?.[item] || {}
          })
          select_cnt += l_cnt
        }
      })
    })
  }
  return page_list
}
