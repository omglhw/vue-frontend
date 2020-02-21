<template>
  <div :class="$style['mg']">
    <navbar :show-full-screen="false" />
    <space :span="3" />
    <div :class="$style['mg-box']">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Navbar } from '@yl/vue-saas-layout';
export default {
  name: 'Cg',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" module >
.mg {
  min-width: 1080px;
  padding: 0px;
  .mg-box {
    padding: 0 20px 20px;
  }
}
</style>
