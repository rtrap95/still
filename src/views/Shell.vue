<template>
  <v-app id="tapp" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile v-for="(menu, i) in menus" :key="i" :to="menu.to">
          <v-list-tile-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{menu.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span class="ml-3">&copy; TSoftware 2019</span>
    </v-footer>
    <v-snackbar v-model="snackbar" :color="snackColor">
      {{ message }}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { EventBus } from "@/eventbus.js";
export default {
  data() {
    return {
      drawer: null,
      title: "Home",
      subtitle: "",
      snackbar: false,
      snackColor: "info",
      message: "",
      menus: [
        {
          icon: "home",
          title: "Home",
          to: "/"
        },
        {
          icon: "library_music",
          title: "Rooms",
          to: "/rooms"
        },
        {
          icon: "settings",
          title: "Impostazioni",
          to: "/settings"
        }
      ]
    };
  },
  watch: {
    $route: function() {
      let newTitle = this.$router.history.current.name;
      this.title = newTitle;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  mounted() {
    EventBus.$on("notify", message => {
      this.snackColor = message.color;
      this.message = message.text;
      this.snackbar = true;
    });
    EventBus.$on("success", message => {
      this.snackColor = "success";
      this.message = message;
      this.snackbar = true;
    });
    EventBus.$on("error", message => {
      this.snackColor = "error";
      this.message = message;
      this.snackbar = true;
    });
  }
};
</script>