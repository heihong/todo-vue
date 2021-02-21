import { DirectiveOptions } from "vue/types/umd";
import Vue from "vue";

const directive: DirectiveOptions = {
  update(el, binding, vnode) {
    Vue.nextTick(() => {
      el.focus();
    });
  },
};

export default directive;
