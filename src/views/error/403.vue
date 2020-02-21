<template>
  <div class="err-page">
    <div class="err-box">
      <div class="err-text">
        403
      </div>
      <img
        src="/error.png"
        alt="403"
      >
      <div class="err-info">
        您访问的页面无权限
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
  methods: {
    goback () {},
  },
};
</script>

<style lang="css" scoped>
@import './error.css';
</style>
