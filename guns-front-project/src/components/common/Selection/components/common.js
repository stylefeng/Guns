/**
 * 单选
 * @param {*当前行数据} record
 * @param {*是选中状态还是取消选中状态} selected
 * @param {*需要添加或删除的数组} lsit
 * @param {*需要添加或删除数组的名字} listName
 * @param {*需要添加或删除当前行的id} listId
 */
export function radioSelect(record, selected, list, listId, listName) {
  // 为选中状态时
  if (selected) {
    let obj = {
      bizId: record[listId],
      name: record[listName],
      ...record,
    };
    if (!list.find(userItem => userItem.bizId == record[listId])) {
      list.push(obj);
    }
  } else {
    // 为不选中状态时,删除当前行
    list.splice(
      list.findIndex(item => item.bizId === record[listId]),
      1
    );
  }
}

/**
 * 多选
 * @param {*是选中状态还是取消选中状态} selected
 * @param {*改变数据的数组} changeRows
 * @param {*需要添加或删除的数组} list
 * @param {*需要添加或删除当前行的id} listId
 * @param {*需要添加或删除数组的名字} listName
 */
export function checkBox(selected, changeRows, list, listId, listName) {
  if (selected) {
    // 全选时遍历选中的数组，加入已选列表
    changeRows.forEach(item => {
      if (!list.find(userItem => userItem.bizId == item[listId])) {
        let obj = {
          bizId: item[listId],
          name: item[listName],
          ...item,
        };
        list.push(obj);
      }
    });
  } else {
    // 反选时删除当前页的全部数据
    changeRows.forEach(item => {
      for (let i = list.length - 1; i >= 0; i--) {
        if (item[listId] == list[i].bizId) {
          list.splice(i, 1);
        }
      }
    });
  }
}

/**
 * 获取表格选中的数据列表
 * @param {*} list
 * @param {*} id
 * @param {*} valList
 */
export function getSelectedRowKeys(list, id, valList,orgId) {
  let selectList = [];
  let selectedRowKeys = [];
  // 表格选择数据跟tree关联-岗位-部门审批人
  if(orgId){
    valList.forEach(value => {
      if (value.subValue == orgId) {
        selectList.push(value);
      }
    });
  }else{
    selectList = valList
  }
  if (list && list.length > 0) {
    list.forEach(listItem => {
      if (selectList.find(item => item.bizId == listItem[id])) {
        selectedRowKeys.push(listItem[id]);
      }
    });
  }

  return selectedRowKeys;
}
