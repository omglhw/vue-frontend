import config from '@/config';
// import workflow from '@/config/workflow';

/**
 * 枚举对象
 * @param {object} obj  [
    {
      name: '移动验房',
      value: 'MobileCheckRoom',
    }...]

    @demo
    const levelTypeEnum = new EnumObj(config.levelType);
    levelTypeEnum.list //获取源数据
    levelTypeEnum.enum.集团  // 返回对应的value值
    levelTypeEnum.get(value) // 返回对应value的项
 */
function EnumObj (obj) {
  this.list = obj;
  const enumObj = {};
  this.list.forEach((item) => {
    enumObj[item.name] = item.value;
  });
  // 获取 {name1:value1,name2:value2}
  // 用法 auditStatus.enum.提交审核
  this.enum = enumObj;
}
// 获取列表
EnumObj.prototype.getList = function () { return this.list; };
// 通过value值获取对应的项
EnumObj.prototype.get = function (v) {
  return this.list.find(item => item.value == v) || {};
};
// 通过code值获取对应的项 如果有code的话
EnumObj.prototype.getByCode = function (code) {
  return this.list.find(item => item.code == code) || {};
};
// 获取第一项
EnumObj.prototype.getFirst = function () {
  return this.list[0] || {};
};

export default EnumObj;
// 数据级别类型
export const levelTypeEnum = new EnumObj(config.levelType);
// 审批类型
// export const approvalTypeEnum = new EnumObj(workflow.approvalType);
