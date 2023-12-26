// @ts-ignore
/* eslint-disable */

import request from "./request";

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


/** 获取某个pic_book下的chapter GET */
export async function picBookChapterMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/chapter/`, {
    method: 'GET',
    ...(options || {}),
  });
}


/** 章节排序 PATCH */
export async function updateChapterSeq(
  // @ts-ignore
  id,
  params,
  options?: { [key: string]: any }
) {
  return request(`/api/pic_book/chapter/${id}/`, {
    method: 'PATCH',
    data: params,
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



/** 获取某个pic_book下的chapter的page及内容 GET */
export async function picBookChapterPageParagraphMeta(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/chapter_page_paragraph/`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取某个pic_book下的chapter的page GET */
export async function picBookChapterPage(
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book/${id}/chapter_page/`, {
    method: 'GET',
    ...(options || {}),
  });
}



/** 更新书籍页面 PATCH */
export async function updateBookPage(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/book_page/${id}/`, {
    method: 'PATCH',
    data: restParams,
    ...(options || {}),
  });
}

/** 新建书籍页面 POST */
export async function addBookPage(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  return request('/api/pic_book/book_page/', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}

/** 删除书籍页面 DELETE */
export async function deleteBookPic(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0 } = params;
  return request(`/api/pic_book/book_page/${id}/`, {
    method: 'DELETE',
    ...(options || {}),
  }).catch(function (error) {
    return {}
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
    data: {
      ...params
    },
    ...(options || {}),
  });
}


/** 更新章节段落 PATCH */
export async function updateChapterParagraph(
  // @ts-ignore
  params,
  options?: { [key: string]: any }
) {
  const { id = 0, ...restParams } = params;
  return request(`/api/pic_book/paragraph/${id}/`, {
    method: 'PATCH',
    data: restParams,
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
