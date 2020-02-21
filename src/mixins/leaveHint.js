import { mapState, mapMutations } from 'vuex';
// 正在编辑的页面离开时提示
// 用法：
//  在组件中使用启用提示
// ...mapMutations('leaveHint', ['setShowLeaveHint']),
// this.setShowLeaveHint(true)
export default {
  data () {
    return {
      hintMessage: '当前窗口编辑的内容未保存，确认关闭吗？',

    };
  },
  computed: {
    ...mapState('leaveHint', ['showLeaveHint', 'routerNext'])
  },
  watch: {
    showLeaveHint (newValue, oldValue) {
      if (newValue) {
        this.bindBeforeunload();
      } else {
        this.unbindBeforeunload();
      }
    }
  },
  mounted () {
    if (this.showLeaveHint) {
      this.bindBeforeunload();
    }
  },
  beforeDestroy () {
    this.unbindBeforeunload();
  },
  // 改变url时，给出提示
  // 注：子组件的beforeRouteLeave是不生效的，需要在父级也要加上mixins
  beforeRouteLeave (to, from, next) {
    if (this.showLeaveHint) {
      this.showLeaveHintFun(to, from, next);
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations('leaveHint', ['setShowLeaveHint', 'setLeaveHintVisible', 'setRouterNext']),
    /* 绑定与解绑浏览器刷新关闭事件 */
    bindBeforeunload () {
      // 点击刷新、关闭按钮，直接通过浏览器给出提示
      window.onbeforeunload = (event) => {
        event.returnValue = this.hintMessage;
        return this.hintMessage;
      };
    },
    unbindBeforeunload () {
      window.onbeforeunload = null;
    },
    beforeunloadHandler (e) {
      event.returnValue = this.hintMessage;
      return this.hintMessage;
    },
    // 确认或取消 执行next
    leaveHintNext (type) {
      if (type) {
        // 重置状态
        this.setShowLeaveHint(false);
      }
      // 隐藏提示
      this.setLeaveHintVisible(false);
      // 执行next
      this.routerNext(type);
    },
    showLeaveHintFun (to, from, next) {
      // 保存next函数
      this.setRouterNext(next);
      // 显示提示
      this.setLeaveHintVisible(true);

      // confirm 回退时会出现闪退bug
      // this.$confirm(this.hintMessage, '温馨提示', {
      //   dangerouslyUseHTMLString: true,
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     // 重置状态
      //     this.setShowLeaveHint(false);
      //     next();
      //   })
      //   .catch(() => {
      //     next(false);
      //   });
    },

  },
};
