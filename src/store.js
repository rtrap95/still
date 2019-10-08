import Vue from "vue";
import Vuex from "vuex";
import Firebase from "@/firebase";
import VuexEasyFirestore from "vuex-easy-firestore";
import modules from "./modules";
import { EventBus } from "./eventbus";
import { SET_CURRENT_ROOM } from "./mutation-types";
Vue.use(Vuex);

const easyFirestore = VuexEasyFirestore(
  [modules.roomsModule, modules.userModule],
  {
    logging: true,
    FirebaseDependency: Firebase
  }
);

export default new Vuex.Store({
  plugins: [easyFirestore],
  state: {
    currentRoom: ""
  },
  mutations: {
    [SET_CURRENT_ROOM](state, arg) {
      state.currentRoom = arg;
    }
  },
  actions: {
    removeRoom({ dispatch, getters }, id) {
      console.log(id);

      console.log(getters.room(id));

      if (getters.room(id).owner === getters.currentUser.id) {
        dispatch("rooms/delete", id).then(() => {
          EventBus.$emit("closedialog");
        })
      } else {
        let patch = { ...getters.room(id) }
        Object.assign(patch, {
          participants: patch.participants.filter(p => p !== getters.currentUser.id)
        })
        dispatch("rooms/patch", patch)
      }
    },
    exitRoom({ commit }) {
      commit("SET_CURRENT_ROOM", "")
      EventBus.$emit("roomchanged");
      EventBus.$emit("closedialog");
    },
    setCurrentRoom({ commit }, arg) {
      commit("SET_CURRENT_ROOM", arg);
      EventBus.$emit("closedialog");
    },
    createRoom({ dispatch, getters }, arg) {
      dispatch("rooms/set", {
        owner: getters.currentUser.id,
        participants: [getters.currentUser.id],
        ...arg
      }).then(res => {
        dispatch("setCurrentRoom", res)
      });
    },
    deleteRoom({ dispatch, getters }, id) {
      dispatch("rooms/delete", id).then(() => {
        EventBus.$emit("closedialog");
      });
    },
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          localStorage.setItem("authenticated", false);
          window.location.href = "/";
        });
    },
    init({ dispatch, state }) {
      dispatch("user/openDBChannel")
        .then(() => dispatch("rooms/openDBChannel"))
        .then(() => {
          if (Object.keys(state.user.user).length === 0) {
            let userInfo = Firebase.auth().currentUser;
            dispatch("user/insert", {
              id: userInfo.uid,
              name: userInfo.displayName,
              email: userInfo.email
            });
          }
        });
    }
  },
  getters: {
    currentUser: state => {
      return Object.values(state.user.user)[0] || {}
    },
    currentRoomData: state => {
      let s = Object.entries(state.rooms.rooms).filter(
        (k, v) => k[0] === state.currentRoom
      )[0];
      return s === undefined ? undefined : s[1];
    },
    room: state => id => {
      return Object.entries(state.rooms.rooms)
        .map((v, i) => v[1])
        .filter(r => r.id === id)[0] || {};
    },
  }
});
