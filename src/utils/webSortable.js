import isJSON from 'is-json';

// 前端排序缓存，把排序后的结果以{list:['id1','id2'...]}格式存到localStorage
class WebSortable {
  /**
   *  localStorage存储格式 {list:['id1','id2'...]}
   * @param {object} param0 {keyName: localStorage的key，key: 源数据的id名}
   */
  constructor ({ keyName = 'sortList', key = 'id' }) {
    this.sortList = [];
    this.key = key;
    this.keyName = keyName;
  }

  //
  set (idList) {
    if (!idList) {
      // 为空时清空
      localStorage.setItem(this.keyName, '{list:[]}');
    } else if (Array.isArray(idList)) {
      localStorage.setItem(this.keyName, JSON.stringify({ list: idList }));
    } else {
      console.error('set方法参数不能为字符串');
    }
  }

  //  返回数据
  get () {
    const value = localStorage.getItem(this.keyName);
    if (isJSON(value)) {
      return JSON.parse(value).list;
    } else {
      return [];
    }
  }

  //
  /**
   * 排序 传入的列表（包含id），按已经缓存的localStorage id 列表排序
   * @param {array} sourceList 数据源
   */
  sort (sourceList) {
    var tempSortArr = [];
    const idList = this.get();
    if (idList.length === 0) {
      return sourceList;
    }

    // 1. 不存在idList排序列表中，优先排序
    sourceList.forEach(item => {
      if (idList.findIndex(id => id === item[this.key]) === -1) {
        tempSortArr.push(item);
      }
    });

    // 2. 存在idList排序列表中的，以idList排序列表的顺序排序
    idList.forEach(id => {
      const item = sourceList.find(item => id === item[this.key]);
      if (item) {
        // push到排序列表中
        tempSortArr.push(item);
      }
    });

    return tempSortArr;
  }
}

export default WebSortable;
