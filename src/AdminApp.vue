<template>
  <section id="app" class="section">
    <div id="firebaseui-auth-container"></div>
    <b-table :data="ratings" :columns="columns"></b-table>
  </section>
</template>

<script>
import { action } from "@/store";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
export default {
  name: "AdminApp",
  data() {
    return {
      ratings: [],
      columns: [
        {
          field: "score",
          label: "Arvio",
          numeric: true
        }
      ],
      user: null
    };
  },
  created() {
    const login = () => {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", {
        callbacks: {
          signInSuccessWithAuthResult: function() {
            return false;
          }
        },
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
      });
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        login();
      }
    });
    this.$store.dispatch(action.FETCH_RATINGS).then(ratings => {
      this.ratings = ratings.map(r => r.data());
    });
  }
};
</script>
