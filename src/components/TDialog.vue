<template>
  <v-dialog v-model="tdialog">
    <template v-slot:activator="{ on }">
      <v-btn :flat="flat" :block="block" color="red darken-1" v-on="on" dark>{{buttonText}}</v-btn>
    </template>
    <v-card>
      <v-card-text>
        {{infoText}}
      </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn dark flat @click="tdialog = false">Cancel</v-btn>
      <v-btn dark flat @click="$store.dispatch(action,params)">{{actionText}}</v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { EventBus } from "@/eventbus";
export default {
  props:{
    block:Boolean,
    flat:Boolean,
    buttonText:String,
    actionText:{
      type:String,
      default:"OK"
    },
    infoText:{
      type:String,
      default:"Are you sure?"
    },
    action:String,
    params:String
  },
  data() {
    return {
      tdialog: false
    };
  },
  mounted() {
    EventBus.$on("closedialog", () => {
      this.loading = false;
      this.tdialog = false;
    });
  }
};
</script>