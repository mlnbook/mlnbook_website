// @ts-ignore
/* eslint-disable */
// import { request } from 'umi';
import request from "./request";

/** 获取列表 GET */
export async function knowledgeList(
    params,
    options?: { [key: string]: any }
  ) {
  return request('/api/pic_book/knowledge/', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}

/** 更新 PATCH */
export async function updateKnowledge(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  const {id=0, ...restParams} = params;
  return request(`/api/pic_book/knowledge/${id}/`, {
    method: 'PATCH',
    data: {
      ...restParams
    },
    ...(options || {}),
  });
}

/** 新建 POST */
export async function addknowledge(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  return request('/api/pic_book/knowledge/', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function deleteKnowledge(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  const {id=0} = params;
  return request(`/api/pic_book/knowledge/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
