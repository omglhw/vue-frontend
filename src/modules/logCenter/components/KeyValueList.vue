<template>
  <div
    :class="$style['key-value-list']"
    class="table-padding-none"
  >
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index"
        :class="$style['list']"
      >
        <span
          :class="$style['label']"
          :style="{width: `${leftWidth}px`}"
        >{{item.propertyTitle}}</span>
        <span :class="$style['content']">{{item.content}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return [];
      },
    },
    leftWidth: {
      type: Number,
      default: 103,
    },
  },
};
</script>

<style lang="scss" module>
.col-title {
  color: #666;
}
.key-value-list {
  overflow: hidden;
  background: #fff;

  padding: 2px 12px;
  .list {
    display: flex;
    align-items: center;
    padding: 4px 0;
    .label {
      display: inline-block;
      text-align: right;
    }
    .content {
      display: inline-block;
      color: #333;
      flex: 1;
    }
  }
}
</style>
