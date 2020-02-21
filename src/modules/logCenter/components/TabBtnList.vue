<template>
  <div>
    <el-tabs
      v-model="selected"
      @tab-click="handleChange"
    >
      <el-tab-pane
        v-for="(item) in homeList"
        :key="item.value"
        :label="item.name"
        :name="item.value"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    selectTag: {
      type: String,
      default: '',
    },
    homeList: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  data () {
    return {
      selected: '',
    };
  },
  computed: {
    ...mapState('leaveHint', ['showLeaveHint']),
  },

  watch: {
    selectTag: {
      immediate: true,
      handler () {
        this.selected = this.selectTag;
      },
    },
    selected (newValue, oldValue) {
      if (this.showLeaveHint) {
        this.$nextTick(() => {
          // 跳转路由时被中止，状态设置上次状态
          if (this.clickActiveName == newValue) {
            this.selected = oldValue;
          }
        });
      }
    },
  },
  methods: {
    handleChange () {
      this.clickActiveName = this.selected;
      this.$router.push(`/log-center/${this.selected}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
