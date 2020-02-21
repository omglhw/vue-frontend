import tippy, { followCursor } from 'tippy.js';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-away.css';

var tippyDirective = 'tippy';
const plugin = {
  install (Vue, options = {}) {
    tippyDirective = options.directive || 'tippy';

    tippy.setDefaultProps(options || {});

    Vue.directive(tippyDirective, {
      inserted (el, binding, vnode) {
        Vue.nextTick(() => {
          // const handlers = (vnode.data && vnode.data.on) ||
          // (vnode.componentOptions && vnode.componentOptions.listeners);

          let opts = binding.value || {};

          opts = Object.assign({}, options, opts);
          if (el.getAttribute('title') && !opts.content) {
            opts.content = el.getAttribute('title');
          }

          if (el.getAttribute('content') && !opts.content) {
            opts.content = el.getAttribute('content');
          }

          // TODO：添加事件 onCreate，onShow，onShown...
          // if (handlers && handlers['show']) {
          //   opts.onShow = function (...args) {
          //     return handlers['show'].fns(...args)
          //   }
          // }

          if (opts.delayRendering || typeof opts.delayRendering == 'number') {
            setTimeout(() => {
              delete opts.delayRendering;
              tippy(el, opts);
            }, typeof opts.delayRendering == 'boolean' ? 0 : opts.delayRendering);
          } else {
            tippy(el, opts);
          }
          if (opts.showOnLoad) {
            el._tippy.show();
          }
        });
      },
      unbind (el) {
        el._tippy && el._tippy.destroy();
      },
      componentUpdated (el, binding, vnode) {
        if (el._tippy) {
          const opts = binding.value || {};

          if (el.getAttribute('title') && !opts.content) {
            opts.content = el.getAttribute('title');
          }

          if (el.getAttribute('content') && !opts.content) {
            opts.content = el.getAttribute('content');
          }
          if (el._tippy) {
            delete opts.delayRendering;
            el._tippy.setProps(opts);
          } else {
            if (opts.delayRendering || typeof opts.delayRendering == 'number') {
              setTimeout(() => {
                el._tippy.setProps(opts);
              }, typeof opts.delayRendering == 'boolean' ? 0 : opts.delayRendering);
            }
          }
        }
      },
    });
  },
};

Vue.use(plugin, {
  allowHTML: false,
  arrow: true,

  animation: 'shift-away',
  theme: 'light',
  offset: '0, 10',
  plugins: [followCursor],
  placement: 'bottom',
  followCursor: true,
  // 推迟渲染，列表出现性能时可使用
  // delayRendering: 100
});
