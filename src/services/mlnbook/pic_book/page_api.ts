// @ts-ignore
/* eslint-disable */

import request from "../request";


/** 获取某个pic_book下的目录 GET */
export async function picBookMenuMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/chapter_page_menu/`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取某个pic_book下的章节目录 GET */
export async function picBookChapterMenuMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/chapter_menu/`, {
    method: 'GET',
    ...(options || {}),
  });
}



/** 新建绘本章节 POST */
export async function addBookChapter(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/chapter/', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}

/** 获取绘本某个章节信息 PATCH */
export async function picBookChapterMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/chapter/${id}/`, {
    method: 'GET',
    params: restParams,
    ...(options || {}),
  });
}


/** 更新绘本章节 PATCH */
export async function updateBookChapter(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/chapter/${id}/`, {
    method: 'PATCH',
    data: restParams,
    ...(options || {}),
  });
}

/** 删除绘本章节 DELETE */
export async function deleteBookChapter(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0 } = params;
  return request(`/api/pic_book/chapter/${id}/`, {
    method: 'DELETE',
    ...(options || {}),
  }).catch(function (error) {
    return {}
  });
}



/** 获取某个页面的内容 POST */
export async function fetchBookPageMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const {id=0, ...restParams} = params
  return request(`/api/pic_book/book_page/${id}/`, {
    method: 'GET',
    params: restParams,
    ...(options || {}),
  });
}


/** 获取某个章节的段落内容 POST */
export async function fetchChapterParagraphMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const {id=0, ...restParams} = params
  return request(`/api/pic_book/chapter/${id}/paragraph/`, {
    method: 'GET',
    params: restParams,
    ...(options || {}),
  });
}


/** 获取段落列表 POST */
export async function chapterParagraphList(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/paragraph/', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}



/** 新建段落 POST */
export async function addChapterParagraph(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/paragraph/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}


/** 更新章节段落 PATCH */
export async function updateChapterParagraph(
  // @ts-ignore
  id,
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/paragraph/${id}/`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

/** 删除章节段落 DELETE */
export async function deleteChapterParagraph(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0 } = params;
  return request(`/api/pic_book/paragraph/${id}/`, {
    method: 'DELETE',
    ...(options || {}),
  }).catch(function (error) {
    return {}
  });
}

/** 更新章节段落顺序 PATCH */
export async function updateChapterParagraphSeq(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/paragraph/set_seq/`, {
    method: 'POST',
    data: restParams,
    ...(options || {}),
  });
}


/** 绘本拖拽排序 PATCH */
export async function picBookSortMenu(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/book/sort_menu/`, {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
