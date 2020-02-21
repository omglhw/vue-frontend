// 手机号码:手机号码位数不做控制，只要是11数字即可
export const isPhoneNumber = (value) => {
  const reg = /^\d{11}$/;
  // const reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  return reg.test(value);
};

// 邮箱
export const isEmail = (value) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/gi.test(value);
};

const isValidityBrithBy15IdCard = function (idCard15) {
  const year = idCard15.substring(6, 8);
  const month = idCard15.substring(8, 10);
  const day = idCard15.substring(10, 12);
  const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));

  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (tempDate.getYear() != parseFloat(year) ||
          tempDate.getMonth() != parseFloat(month) - 1 ||
          tempDate.getDate() != parseFloat(day)) {
    return false;
  }
  return true;
};

/**
   * 校验身份证合法性
   * @param {String} code
   * @returns {Boolean} true:合法，false:非法
   */
export const isIDCode = function (code) {
  code = code.toUpperCase();

  let reg;
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  };

  if (!city[code.substr(0, 2)]) {
    return false;
  }

  if (code.length == 15) {
    reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

    if (reg.test(code)) {
      return isValidityBrithBy15IdCard(code);
    }

    return false;
  } else if (code.length == 18) {
    reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

    if (!reg.test(code)) {
      return false;
    } else {
      code = code.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }

      if (parity[sum % 11] != code[17]) {
        return false;
      }
      return true;
    }
  }

  return false;
};

/**
 * 密码强度 （3级）
 * @param {string} newPwd 密码
 */
export const passwordStrength = (newPwd) => {
  let passwordPercentage = 0;
  if (!newPwd) {
    passwordPercentage = 0;
    return passwordPercentage;
  }
  if (newPwd.length < 8) {
    passwordPercentage = 1;
    return passwordPercentage;
  }
  if (/^[0-9]+$/.test(newPwd) || /^[a-zA-Z]+$/.test(newPwd) || /^[.~!@#$%^+*&\\/?|:.{}()';="]+$/.test(newPwd)) {
    passwordPercentage = 1;
  } else {
    if (/[a-z]/.test(newPwd) && /[A-Z]/.test(newPwd) && /[0-9]/.test(newPwd)) {
      passwordPercentage = 3;
    } else {
      passwordPercentage = 2;
    }
  }
  if (/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(newPwd) && newPwd.length >= 8 && /^(?![^0-9]+$)(?![^a-zA-Z]+$).+$/.test(newPwd)) {
    passwordPercentage = 3;
  }
  return passwordPercentage;
};

//   必须包含数字、字母、特殊字符中的任意两种区分大小写
export const isPassword = (v) => {
  const reg = /(?!^(\d+|[a-z]+|[A-Z]+|[~!@#$%^&*?^+*&\\/?|:.{}()';=]+)$)^[\w~!@#$%^&*?^+*&\\/?|:.{}()';=]{8,}$/;
  return reg.test(v);
};

// 账号：账号应只能为数字/英文字母，不能包含特殊字符/中文
export const isAccount = (v) => {
  const reg = /^([a-zA-Z]|\d)+$/;
  return reg.test(v);
};

// 是否有效的URL
export const isURL = (url) => {
  return /^((http|ftp|https):\/\/)(([a-zA-Z0-9._-]+.[a-zA-Z]{2,6})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9&%_.\/-~-#!]*)?.*$/.test(url);
};
