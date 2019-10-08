<template>
  <v-layout row wrap>
    <v-flex v-if="$store.state.currentRoom!==''" xs12 sm6 offset-sm3>
      <player/>
    </v-flex>
    <v-flex v-if="$store.state.currentRoom!==''" xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <t-dialog block action="exitRoom" actionText="Exit" buttonText="Exit Room"/>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex v-if="$store.state.currentRoom===''" xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <v-btn block color="teal lighten-2" to="rooms" dark>Join Room</v-btn>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <create-dialog/>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "@/axios";
import { spconfig } from "@/spconfig";
import TDialog from "@/components/TDialog.vue";
import CreateDialog from "@/components/CreateDialog.vue";
import Player from "@/components/Player.vue";
export default {
  components: { CreateDialog, TDialog, Player },
  computed: {},
  data() {
    return {};
  },
  mounted() {
    this.initSpotify();
  },
  methods: {
    initSpotify: function() {
      axios.get(
        `https://accounts.spotify.com/authorize?client_id=${
          spconfig.client_id
        }&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .v-btn {
  min-height: 160px;
}
</style>
