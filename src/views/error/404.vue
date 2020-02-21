<template>
  <div class="err-page">
    <div class="err-box">
      <div class="err-text">
        404
      </div>
      <img
        src="/error.png"
        alt="403"
      >
      <div class="err-info ">
        <p>您访问的页面不存在</p>
        <br />
        <p
          v-if="redirectedFrom"
          class="text-medium gray"
        >
          链接：{{redirectedFrom}}
        </p>
      </div>
      <div class="err-btn">
        <!-- <button
          type="button"
          class="primary"
          @click="goback()"
        >
          <span>
            返回
          </span>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      redirectedFrom: '',
    };
  },
  mounted () {
    if (this.$route.redirectedFrom) {
      this.redirectedFrom = this.$route.redirectedFrom;
    }
  },
  methods: {
    goback () {},
  },
};
</script>

<style lang="css" scoped>
@import './error.css';
</style>
