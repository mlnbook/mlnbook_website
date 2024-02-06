import { knowledgeList } from "@/services/mlnbook/knowledge_api";

/*
获取tree data 第一个叶子节点
 */
export const fetchTreeFirstLeaf = (bookMenu, tagLabel = false) => {
  let firstLeaf = undefined;
  const loop = (data, callback) => {
    for (let i = 0; i < data.length; i++) {
      if ((data[i]?.children || [])?.length == 0) {
        return callback(tagLabel ? data[i].tag_label : {
          chapter_id: data[i].id,
          chapter_title: data[i].title,
          parent: data[i].parent,
        });
      }
      loop(data[i].children, callback);
    }
  };
  const data = [...bookMenu];
  // Find dragObject
  loop(data, (id) => {
    if (firstLeaf == undefined) {
      firstLeaf = id
    }
  });
  return firstLeaf
}

/*
获取tree data 第一个节点
 */
export const fetchTreeFirstNode = (bookMenu, tagLabel = false) => {
  const data = [...bookMenu];
  // Find dragObject
  if (data?.length > 0) {
    return {
      chapter_id: data[0].id,
      chapter_title: data[0].title,
      parent: data[0].parent,
    };
  }
  return undefined
}


/**
 * 获取知识点下拉选择内容
 * @returns
 */
export const fetchKpointDataOptions = async () => {
  const result = await knowledgeList({})
  return result?.map((item) => { return { label: item?.knowledge, value: item?.id } })
}


/**
 * 将layout原始数据格式化为下拉选项
 * @param originData
 * @returns
 */
export const formatLayoutOptions = (originDataInfo) => {
  return originDataInfo?.map((item) => { return { label: `${item?.title}(${item?.grid_row_col})`, value: item?.id } })
}

/**
 * 将layout原始数据格式化为map格式，{id: {}} 方便获取
 * @param originData
 * @returns
 */
export const formatLayoutMap = (originDataInfo) => {
  return originDataInfo?.reduce((accumulator, item) => {
    const key = item?.id;
    accumulator[key] = item;
    return accumulator;
  }, {})
}


/**
 * 给绘本目录添加value字段
 * @param data
 */
export const formatMenuValue = (data) => {
  data?.forEach(item => {
    item.value = item.key
    if (item?.children) {
      formatMenuValue(item?.children)
    }
  })
}


/**
 *
 * @param info 验证是否可拖拽
 */
export const validTreeDrag = (info) => {
  let canDrag = true;
  let errMsg = '';
  if (!info.dropToGap) {
    if (info.node.expanded && info.node.pos.split('-')?.length > 2) {
      return { canDrag: false, errMsg: '目录最大层级不能超过2层' }
    }
  }
  return { canDrag: canDrag, errMsg: errMsg }
}



export const dashMenuDragParams = (info, data) => {
  const targetInfo = fetchTargetInfo(info.dragNode.key, data)
  return {
    sort_key: info.dragNode.key,
    // target_parent: info.node.key,
    // target_children: info.node.children?.map(function(item){return item.key}),
    target_parent: targetInfo.target_parent,
    target_children: targetInfo.target_children?.map(function (item) { return item.key })
  }
}

const fetchTargetInfo = (dragKey, data) => {
  let target_parent = "";
  let target_children = [];
  const loop = (data, key, parent, callback) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, parent, data);
      }
      if (data[i].children) {
        loop(data[i].children, key, data[i].key, callback);
      }
    }
  };
  loop(data, dragKey, null, (item, index, parent, arr) => {
    target_parent = parent
    target_children = arr
  });

  return {
    target_parent: target_parent,
    target_children: target_children
  }
}


export const dragHandler = (info, dashMenu) => {
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
  const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback);
      }
    }
  };
  const data = [...dashMenu];
  // Find dragObject
  let dragObj;
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, item => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else if (
    (info.node.props.children || []).length > 0 && // Has children
    info.node.props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, item => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
      // in previous version, we use item.children.push(dragObj) to insert the
      // item to the tail of the children
    });
  } else {
    let ar;
    let i;
    loop(data, dropKey, (item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }
  return data
}


/**
 * 根据段落的内容以及段落的布局，计算出一共需要显示的页面数
 * @param paras
 * @param typeset
 */
export const calcParaPages = (paras, typeset) =>{
  let pages = 0
  if(typeset?.c_type == 'norm'){
    const l_cnt = JSON.parse(typeset?.layout_cfg?.[0]?.grid_row_col)?.length
    pages = Math.ceil(paras?.length / l_cnt)
  }
  else{

  }
  return pages
}

/**
 * 根据当前设置的布局列表，确定当前的选中的段落内容数量
 * @param data
 * @param layoutData
 * @returns
 */
export const formatParaLayoutFunc = (relation_data, layoutOriginData, paraTagsData) => {
  let select_cnt = 0
  let format_layout = []
  const layoutMap = formatLayoutMap(layoutOriginData)
  relation_data?.forEach((item) => {
    if (select_cnt < paraTagsData?.length) {
      select_cnt += JSON.parse(layoutMap?.[item]?.grid_row_col)?.length
      format_layout.push(item)
    }
  })
  return { select_cnt: select_cnt, format_layout: format_layout }
}
