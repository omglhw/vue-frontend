<template>
  <el-date-picker
    v-model="date"
    type="datetimerange"
    :picker-options="pickerOptions"
    :default-time="['00:00:00','23:59:59']"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    align="left"
    prefix-icon="el-icon-date"
  >
  </el-date-picker>
</template>

<script>
import { today } from '../utils';
export default {
  props: {
    value: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', today);
            },
          },
          {
            text: '最近7天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近30天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      date: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue, oldValue) {
        this.date = this.value;
      },
    },
    date () {
      this.$emit('input', this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
