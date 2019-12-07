import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import VueConfetti from "vue-confetti";
import { firestorePlugin } from "vuefire";
import "buefy/dist/buefy.css";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(firestorePlugin);
Vue.use(VueConfetti);

const initialLevel = localStorage.getItem("level");
store.commit("setLevel", initialLevel ? parseInt(initialLevel) : 0);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
