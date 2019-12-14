import Vue from "vue";
import App from "./App.vue";
import AdminApp from "./AdminApp.vue";
import Buefy from "buefy";
import VueConfetti from "vue-confetti";
import { firestorePlugin } from "vuefire";
import "buefy/dist/buefy.css";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(firestorePlugin);
Vue.use(VueConfetti);

const initialLevel = localStorage.getItem("level");
store.commit("setLevel", initialLevel ? parseInt(initialLevel) : 0);
const app = window.location.pathname === "/admin" ? AdminApp : App; // Split between admin and normal app

new Vue({
  store,
  render: h => h(app)
}).$mount("#app");
