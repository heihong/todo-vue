import Vue from "vue";
import App from "./App.vue";
import focus from "./components/focus";

Vue.config.productionTip = false;
Vue.directive("focus", focus);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
