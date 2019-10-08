<template>
  <div class="login">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import "../../node_modules/firebaseui/dist/firebaseui.css";
export default {
  mounted() {
    let self = this;
    let uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: "select_account"
          }
        },
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult() {
          localStorage.setItem("authenticated", true);
          window.location.href = "/";
        }
      }
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
