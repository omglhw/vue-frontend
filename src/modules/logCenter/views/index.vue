<template>
  <div>
    <tab-btn-list
      :home-list="logBtnList"
      :select-tag="selectTag"
    />
    <!-- key 设置为+selectOrgId，当公司改变时重新加载 -->
    <div
      :is="currentComponent.component"
      :key="currentComponent.value"
      :ref="currentComponent.value"
    />
    <!-- <dialog-qrcode
      v-if="qrcodeVisible"
      :preview-href="previewHref"
      :visible.sync="qrcodeVisible"
    /> -->
  </div>
</template>

<script>
import TabBtnList from '@/modules/logCenter/components/TabBtnList';

import { createNamespacedHelpers } from 'vuex';
const namespace = 'logCenter/common';
const { mapMutations } = createNamespacedHelpers(namespace);

const logBtnList = [
  {
    name: '登录日志',
    value: 'login-log',
    showFun () {
      return true;
    },
    component: () =>
      import(
        /* webpackChunkName: "logCenter" */ '@/modules/logCenter/components/LoginLog'
      ),
  },
  // {
  //   name: '点击日志',
  //   value: 'access-log',
  //   showFun () {
  //     return true;
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "logCenter" */ '@/modules/logCenter/components/AccessLog'
  //     ),
  // },
  {
    name: '操作日志',
    value: 'change-log',
    showFun () {
      return true;
    },
    component: () =>
      import(
        /* webpackChunkName: "logCenter" */ '@/modules/logCenter/components/ChangeLog'
      ),
  },
];
export default {
  components: {
    TabBtnList,
  },
  data () {
    return {
      selectTag: '',
      qrcodeVisible: false,
    };
  },
  computed: {
    // 当前所在组件
    currentComponent () {
      const component = this.logBtnList.find(
        item => item.value === this.selectTag
      );

      if (component) {
        return component;
      }
      return {};
    },
    logBtnList () {
      return logBtnList.filter(item => item.showFun());
    },
  },
  watch: {
    $route (to, from) {
      this.selectTag = this.$route.meta.selectedTab;
    },
  },
  async created () {
    this.selectTag = this.$route.meta.selectedTab;
    const selectItem = this.logBtnList.find(
      item => item.value == this.selectTag
    );
    if (!selectItem) {
      // 如果打开路由对应的功能没有权限，重定向到其它拥有权限的路由
      this.$router.push(`/log-center/${this.logBtnList[0].value}`);
    }
  },
  mounted () {
    // 火狐拖拽新标签问题
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  methods: {
    ...mapMutations(['setSelectOrg']),
    handleClickView () {
      this.qrcodeVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
