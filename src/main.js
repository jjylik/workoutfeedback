import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import { firestorePlugin } from "vuefire";
import "buefy/dist/buefy.css";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(firestorePlugin);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
