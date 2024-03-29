// @ts-ignore
/* eslint-disable */

import request from "../request";

/** 获取pic_book列表 GET */
export async function picBookList(
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book/', {
    method: 'GET',
    data: {
      ...params
    },
    ...(options || {}),
  });
}

/** 获取某个pic_book GET */
export async function picBookMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/`, {
    method: 'GET',
    ...(options || {}),
  });
}


/** 预览某个pic_book GET */
export async function picBookPreviewMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/preview/`, {
    method: 'GET',
    ...(options || {}),
  });
}




/** 更新pic_book PATCH */
export async function updatePicBook(
  // @ts-ignore
  id,
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/book/${id}/`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

/** 新建pic_book POST */
export async function addPicBook(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除pic_book DELETE */
export async function deletePicBook(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0 } = params;
  return request(`/api/pic_book/book/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}



/** 获取voice_template列表 GET */
export async function voiceTemplateList(options?: { [key: string]: any }) {
  return request('/api/pic_book/voice_template/', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 获取author列表 GET */
export async function authorList(options?: { [key: string]: any }) {
  return request('/api/pic_book/author/', {
    method: 'GET',
    ...(options || {}),
  });
}



/** 更新章节 PATCH */
export async function updateChapter(
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

/** 新建章节 POST */
export async function addChapter(
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

/** 删除章节 DELETE */
export async function deleteChapter(
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
