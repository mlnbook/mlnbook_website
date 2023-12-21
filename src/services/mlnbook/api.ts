// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取pic_book列表 GET */
export async function picBookList(options?: { [key: string]: any }) {
  return request('/api/pic_book/book/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新pic_book PATCH */
export async function updatePicBook(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  const {id=0, ...restParams} = params;
  return request(`/api/pic_book/book/${id}/`, {
    method: 'PATCH',
    data: {
      ...restParams
    },
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
    data: {
      ...params
    },
    ...(options || {}),
  });
}

/** 删除pic_book DELETE */
export async function deletePicBook(
    // @ts-ignore
    params,
    options?: { [key: string]: any }
) {
  const {id=0} = params;
  return request(`/api/pic_book/book/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
