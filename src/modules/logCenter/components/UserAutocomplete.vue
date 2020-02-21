<template>
  <el-autocomplete
    v-model="keyword"
    clearable
    style="width: 210px"
    placeholder="用户名/账号"
    :fetch-suggestions="querySearchAsync"
    :trigger-on-focus="false"
    @keydown.enter.native="handleSearch"
    @select="handleSelect"
    @clear="handleSearch"
  >
    <template slot-scope="{ item }">
      <span :title="item.value">
        <span>{{ item.value }}</span>
        <span
          v-if="item.account"
          class="gray"
        >({{ item.account }})</span>
      </span>
    </template>
  </el-autocomplete>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      keyword: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.keyword = this.value;
      },
    },
    keyword () {
      this.$emit('input', this.keyword);
    },
  },
  methods: {
    ...mapActions('logCenter/common', ['getUsers']),
    // 联想
    querySearchAsync (keyword, cb) {
      this.getUsers({ keyword }).then(res => {
        if (res.errcode === 0) {
          if (Array.isArray(res.data.items)) {
            cb(
              res.data.items.map(item => ({
                ...item,
                value: item.name,
              }))
            );
          }
        }
      });
    },
    // 选择联想项
    handleSelect () {
      this.$nextTick(() => {
        this.$emit('search');
      });
    },
    handleSearch () {
      this.$emit('search');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
