<template>
  <v-dialog v-model="createDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn block color="orange darken-2" v-on="on" dark>Create Room</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="createDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Spoti Room</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="loading" dark flat @click="createRoom">Create</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-form ref="form">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="roomData.name" label="Room name" :rules="nameRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="roomData.invitations"
                label="Invitations"
                multiple
                chips
                :rules="emailRules"
              ></v-combobox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { EventBus } from "@/eventbus";
export default {
  data() {
    return {
      createDialog: false,
      loading: false,
      roomData: {
        name: "",
        invitations: [],
        private: false
      },
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v =>
          v.reduce((valid, e) => valid && /.+@.+/.test(e), true) ||
          "E-mail must be valid"
      ]
    };
  },
  methods: {
    createRoom: function() {
      if (this.$refs.form.validate()) {
          
      this.loading = true;
      this.$store.dispatch("createRoom", this.roomData);
        }
    }
  },
  mounted() {
    EventBus.$on("closedialog", () => {
      this.loading = false;
      this.createDialog = false;
    });
  }
};
</script>