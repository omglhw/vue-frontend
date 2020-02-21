# vue frontend-saas

node环境 10.12.0

saas 后台前端

# vue-cli 3
- 开发：yarn serve
- 测试：yarn build:test
- beta：yarn build:beta
- 生产：yarn build:prod

yarn build:pub同时构建beta和生产

# nginx配置环境root

 >测试环境：root要指向/dist/dist-test（cg,mg...）

 >beta环境：root要指向/dist/dist-beta（cg,mg...）

 >生产环境：root要指向/dist/dist-prod（cg,mg...）

# 接口url选择
- nginx反向代理

 >使用的api需要在nginx里面配置反向代理(见nginx.conf文件)

- 跨域方式调用接口(后端希望此方式，方便排除问题方便)
 >在对应的环境变量文件中配置（见.env.环境文件）


## 环境

VUE_APP_VERSION： app版本号和package.json的version一致

outputDir ：输出目录，比如生产环境目录为dist-prod，生产服务器的nginx主目录也是配置指向dist/dist-prod

详细见.env开关的文件

# 开发

- scss已配置全局变量(src/assets/style/variables.scss)，可以在vue的style(scss)和scss文件中使用
-



## $http
### 禁用全局提示
- globalMsg 成功返回禁用提示
- globalErrorMsg 请求错误禁用提示
默认是全局判断errcode 不为0时,element-ui的message组件提示错误信息，个别接口如需不用提示，可在$http的config的headers里面添加配置globalMsg:false, 如下：
```javascript
this.$http
.post(
this.APIS.reportCenter.addSaasFromStandard,
{
standardId: selectedReportIds,
tenantCode:  this.$utils.userInfo.tenantCode,
isCover: isCover,
},
{
	headers:  {
	// 不需要全局的提示
	globalMsg:  false,
	},
}
)
.then(res =>  {
if  (res.errcode ==  0)  {
this.$message.success('添加成功');
this.$router.push('/report-center/statistics-report');
}  else  if  (res.errcode ===  11000)  {
// ***自定义提示***
this.$confirm('已存在，是否覆盖?',  '提示',  {
confirmButtonText:  '确定',
cancelButtonText:  '取消',
type:  'warning',
})
});
```

# 更新iconfont

路径：\src\assets\font\iconfont

iconfont项目网址：https://www.iconfont.cn


在我的项目中找到“saas后台”，更新icon，下载到本地解压把文件放到以上路径中



# 离开提示功能

 浏览器刷新，返回，路由跳转等情况时，未保存内容时提示

## 用法： setShowLeaveHint（true提示，false不提示）
 1 在父级组件中mixins文件（@/mixins/leaveHint.js）

 2 在组织中使用 ： this.setShowLeaveHint(true);

 3 在store中使用： commit('leaveHint/setShowLeaveHint', true, { root: true });
