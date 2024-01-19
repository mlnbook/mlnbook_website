// @ts-ignore
/* eslint-disable */

import request from "../request";


/** 获取绘本某个段落的语音列表 */
export async function picBookVoiceListMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const {id=0, ...restParams} = params;
  return request(`/api/pic_book/book/${id}/voice_list/`, {
    method: 'GET',
    params: {
      ...restParams
    },
    ...(options || {}),
  });
}

/** 新建段落语音 POST */
export async function addPicBookVoiceRelation(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book_voice/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}


/** 调用批量生成段落语音 POST */
export async function bulkGenVoiceFiles(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book_voice/bulk_gen_voice_files/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 调用单次生成段落语音 POST */
export async function paragraphVoiceFiles(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book_voice/paragraph_voice_file/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}






/** 获取绘本某个段落的语音列表 */
export async function paragraphVoiceListMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/paragraph_voice/`, {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}


/** 获取绘本某个段落的语音 */
export async function paragraphVoiceMeta(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/paragraph_voice/${id}/`, {
    method: 'GET',
    params: {
      ...restParams
    },
    ...(options || {}),
  });
}


/** 新建段落语音 POST */
export async function addParagraphVoice(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/paragraph_voice/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 更新绘本章节 PATCH */
export async function updateParagraphVoice(
  // @ts-ignore
  id,
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/paragraph_voice/${id}/`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

/** 删除绘本章节 DELETE */
export async function deleteParagraphVoice(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0 } = params;
  return request(`/api/pic_book/paragraph_voice/${id}/`, {
    method: 'DELETE',
    ...(options || {}),
  }).catch(function (error) {
    return {}
  });
}

