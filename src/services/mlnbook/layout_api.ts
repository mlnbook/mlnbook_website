// @ts-ignore
/* eslint-disable */
import request from "./request";

/** 获取列表 GET */
export async function layoutList(
    params,
    options?: { [key: string]: any }
  ) {
  return request('/api/pic_book/layout/', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}

/** 更新 PATCH */
export async function updateLayout(
    // @ts-ignore
    id,
    params,
    options?: { [key: string]: any }
) {
  return request(`/api/pic_book/layout/${id}/`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

/** 新建 POST */
export async function addLayout(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  return request('/api/pic_book/layout/', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function deleteLayout(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  const {id=0} = params;
  return request(`/api/pic_book/layout/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
