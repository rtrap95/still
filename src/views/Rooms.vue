<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 offset-sm3>
      <join-dialog/>
    </v-flex>
    <v-flex v-for="room in $store.state.rooms.rooms" :key="room.id" xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          {{room.name}}
          <v-spacer></v-spacer>
          <template v-if="room.id!==$store.state.currentRoom">
            <t-dialog
              flat
              :params="room.id"
              action="removeRoom"
              actionText="Remove"
              buttonText="Remove"
            />
            <v-btn @click="joinRoom(room.id)" flat color="info">Join</v-btn>
          </template>
          <v-btn v-else @click="$store.dispatch('exitRoom')" flat color="warning">Exit</v-btn>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TDialog from "@/components/TDialog.vue";
import JoinDialog from "@/components/JoinDialog.vue";
export default {
  components: { TDialog, JoinDialog },
  data() {
    return {};
  },
  computed: {},
  methods: {
    joinRoom: function(id) {
      this.$store.dispatch("setCurrentRoom", id);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .v-btn {
  margin: 0;
}
</style>

