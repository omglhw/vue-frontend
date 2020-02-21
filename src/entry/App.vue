<template>
  <div id="app">
    <!-- 禁用 浏览器记住密码 -->
    <input
      type="text"
      style="display: none;"
    >
    <input
      type="password"
      style="display: none;"
    >
    <!-- end禁用 浏览器记住密码 -->
    <router-view />

    <!-- 未保存提示 -->
    <el-dialog
      title="温馨提示"
      :visible="leaveHintVisible2"
      width="400px"
    >
      <span><i
          style="    width: 35px;
    font-size: 24px;
    color: #f89a11;"
          class="el-icon-warning"
        ></i>{{hintMessage}}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="() => leaveHintNext(false)">取 消</el-button>
        <el-button
          type="primary"
          @click="leaveHintNext(true)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import leaveHint from '@/mixins/leaveHint';
import { mapState } from 'vuex';
export default {
  mixins: [leaveHint],
  computed: {
    ...mapState('leaveHint', ['leaveHintVisible']),
    leaveHintVisible2: {
      get () {
        return this.leaveHintVisible;
      },
      set (v) {},
    },
  },
  created () {
    // 删除载入动画
    document.body.removeChild(document.getElementById('appLoading'));
  },
  mounted () {},
};
</script>
