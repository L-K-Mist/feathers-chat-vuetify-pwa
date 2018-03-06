<template>
  <v-app>
    <v-content>
      <h3 v-if="showWelcome">Hello {{ user.name }}, welcome back</h3>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("signInAuto");
  },
  data() {
    return {
      fixed: false,
      showWelcome: false,
      username: undefined
    };
  },
  computed: {
    // This watched computed property pattern is advised for async operations
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        // Make sure there's an authenticated user
        this.showWelcome = true;
        this.$store.dispatch("fetchMessages"); // Now that we know there's an authenticated user, we can request messages from the database for our store. - BECAUSE - if we trigger a fetch before there's a logged in user, feathers throws an error.
      }
    }
  }
};
</script>
