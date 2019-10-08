<template>
  <v-dialog v-model="joinDialog">
    <template v-slot:activator="{ on }">
      <v-btn block color="teal lighten-2" v-on="on" dark>Join Room</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-text-field v-model="roomCode" label="Room code"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark flat @click="joinDialog = false">Cancel</v-btn>
        <v-btn :loading="loading" :disabled="roomCode===''" dark flat @click="joinRoom">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      joinDialog: false,
      roomCode: "",
      loading: false
    };
  },
  methods: {
    joinRoom: function() {}
  }
};
</script>