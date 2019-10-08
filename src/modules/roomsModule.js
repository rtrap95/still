const roomsModule = {
  firestorePath: "rooms",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "rooms",
  statePropName: "rooms",
  namespaced: true, // automatically added
  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  sync: {
    where: [["participants", "array-contains", "{userId}"]]
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};
export default roomsModule;
