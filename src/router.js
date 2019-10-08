import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Shell from "./views/Shell.vue";
import Firebase from "@/firebase";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "",
      name: "main",
      component: Shell,
      redirect: "/home",
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home
        },
        {
          path: "/rooms",
          name: "Rooms",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Rooms.vue")
        },
        {
          path: "/settings",
          name: "Impostazioni",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Settings.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;
