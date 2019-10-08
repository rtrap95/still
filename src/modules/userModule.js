import firebase from "firebase";
const userModule = {
  firestorePath: "users",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "user",
  statePropName: "user",
  namespaced: true, // automatically added
  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  sync: {
    where: [[firebase.firestore.FieldPath.documentId(), "==", "{userId}"]]
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};
export default userModule;
