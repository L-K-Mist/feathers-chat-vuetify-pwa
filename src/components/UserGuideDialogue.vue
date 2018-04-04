<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Looks like you're not logged in yet?</v-card-title>
        <v-card-text>If you've signed up before then log in, otherwise, sign up</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="userRegister">Let me register</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="userLogin">Let me log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  computed: {
    dialog: {
      get() {
        // These get and set methods syncronise the state of the login guide. Therefore any component can switch on the login guide by dispatching the showLoginGuide action
        return this.$store.getters.showLoginGuide;
      },
      set(dialog) {
        this.$store.dispatch("showLoginGuide", dialog);
      }
    }
  },
  methods: {
    // These methods do NOT actually register the user, but only set whether the gui should show the Sign In form or the Sign Up form
    // They call on the Vuex userGuide module, not the Authentication aspects placed in the main store.

    userRegister() {
      this.$store.dispatch("userRegister", true);
      this.$router.replace({ name: "AppAuthentication" }); // Both userRegister and userLogin go to the AppAuthentication route, but the component shown at AppAuthentication depends on whether the user is signing up or signing in
      this.dialog = false; // close this dialog
    },
    userLogin() {
      this.$store.dispatch("userLogin", true);
      this.$router.replace({ name: "AppAuthentication" });
      this.dialog = false; // close this dialog
    }
  }
};
</script>