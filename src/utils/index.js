import Vue from 'vue';
// 获取url参数
export function getQueryString (name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`;
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

// 下载 blob模式
export function downloadFile (url, name, suffix, params) {
  return Vue.$http
    .get(
      url,
      { params: params },
      {
        responseType: 'blob',
        onDownloadProgress (a) {
          // 监听下载进度
          let percent = (a.loaded * 100 / a.total).toFixed(2);
          console.info(percent, 'percent');
        }
      }
    )
    .then(res => {
      if (res && typeof res.errcode != 'undefined') {
        return Promise.resolve(res);
      }
      const content = res;
      const blob = new Blob([content]);
      const fileName = name + suffix;
      if ('download' in document.createElement('a')) {
      // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
      // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
      return Promise.resolve(res);
    }).catch(error => {
      console.warn(error);
      return Promise.reject(error);
    });
}

/**
 * 删除url中的参数
 * @param {string} url url
 * @param {string} parameter 参数
 */
export function removeURLParameter (url, parameter) {
  const urlparts = url.split('?');
  if (urlparts.length >= 2) {
    // 参数名前缀
    const prefix = encodeURIComponent(parameter) + '=';
    const pars = urlparts[1].split(/[&;]/g);

    // 循环查找匹配参数
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        // 存在则删除
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

// 删除url的ticket，sid，o参数
export function removeAuthParameter (query) {
  if (query.sid) {
    delete query.sid;
  }
  if (query.ticket) {
    delete query.ticket;
  }
  if (query.o) {
    delete query.o;
  }
  return query;
}

/**
 * 尝试从seesionStorage中获取json
 * * key: Storage的key
 * returnValue： json出错时返回的默认值
 */
export function tryGetSessionStorage2JSON (key, returnValue = {}) {
  let json;
  try {
    json = JSON.parse(sessionStorage.getItem(key));
  } catch (e) {
    json = returnValue;
  }
  return json;
}

// 尝试把json字符转成json
export function try2JSON (jsonString, returnValue = {}) {
  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (e) {
    json = returnValue;
  }
  return json;
}

/**
 * 尝试从localStorage中获取json
 * key: Storage的key
 * returnValue： json出错时返回的默认值
 */
export function tryGetLocalStorage2JSON (key, returnValue = {}) {
  let json;
  try {
    json = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    json = returnValue;
  }
  return json;
}

// 遍历每一项,通过property添加属性
// 使用：
// runTree({
//   list: this.tree,
//   property: (item, parent) => {
//         注：必须返回
//         return {
//
//           添加新字段
//           fieldA:111,
//         }
//   },
//       callback: (item,parent) => {

//       }
// })
export function runTree ({ list, parent, property, callback, children = 'children' }) {
  return list.map(item => {
    let p = {};
    if (property) {
      p = property(item, parent);
    }
    const newItem = { ...item, ...p };
    if (Array.isArray(newItem[children])) {
      newItem[children] = runTree({ list: newItem[children], parent: newItem, property, callback, children });
    }
    callback && callback(newItem, parent);
    return newItem;
  });
}

/**
 * 列表转树
 * / {
 * id = 'id', // 当前项的id字段名
 * parentId = 'parentId',// 父id字段名
 * children = 'children',// 子级字段名 }
 */

export function toTree (data, { id = 'id', parentId = 'parentId', children = 'children' }) {
  let map = {};
  let val = [];
  // 生成数据对象集合
  data.forEach(it => {
    map[it[id]] = it;
  });
  // 生成结果集
  data.forEach(it => {
    const parent = map[it[parentId]];
    if (parent) {
      if (!Array.isArray(parent[children])) parent[children] = [];
      parent[children].push(it);
    } else {
      val.push(it);
    }
  });
  return val;
};

/**
 * 格式化手机号码 星星符号替换
 *
 */
export function starPhone (phone) {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return phone.replace(reg, '$1****$2');
}
