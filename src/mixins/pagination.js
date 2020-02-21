
import Vue from 'vue';
import config from '@/config';
// 后端和前端的分页参数不一致，前端和element-ui的分页组件一致
Vue.mixin({
  data () {
    return {
      PAGINATION: {
        pageSize: config.pageSize,
        currentPage: 1,
        total: 0,
        reset: () => {
          this.resetPagination();
        }

      }
    };
  },
  methods: {
    resetPagination () {
      this.PAGINATION = {
        pageSize: this.PAGINATION.pageSize,
        currentPage: 1,
        total: 0,
        reset: () => {
          this.resetPagination();
        }
      };
    },
    /**
     * 获取请求参数 默认只传递index(页码) limit(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
     * @param params
     * @returns {*}
     */
    getParams (params) {
      return Object.assign({
        page: this.PAGINATION.currentPage,
        limit: this.PAGINATION.pageSize
      }, params);
    },
    /**
     * 加载更多
     */
    loadMore () {
      this.page++;
    },
    // 分页长度改变
    handleSizeChange (pageSize) {
      this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      };
    },

    // 分页页码改变
    handleCurrentChange (currentPage) {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      };
      this.loadData();
    },
    /**
     * @overwrite
     * 加载数据方法 用到该mixin的都应该重写该方法 否则无法实现加载数据
     */
    loadData () {
      // 每个列表自己的获取数据的方法需要重写
    },
  },
});
