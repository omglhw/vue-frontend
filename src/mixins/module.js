Vue.mixin({
  computed: {
    // 获取模块名 根据路由名获取 如/a/b/c 返回a
    $moduleName () {
      const match = this.$route.fullPath.match(/^\/(\w+)\//);
      if (match && match.length > 1) {
        return match[1];
      }
      return '';
    }
  }
});
