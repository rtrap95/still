import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Firebase from "./firebase";
import "./filters";
import MultiFiltersPlugin from "./plugins/MultiFilters";

Vue.config.productionTip = false;
Vue.use(MultiFiltersPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch("init");
        this.$router.push("/");
      } else {
        this.$router.push("/login");
      }
    });
  }
}).$mount("#app");
