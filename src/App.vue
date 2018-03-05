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
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.showWelcome = true;
        //const _user = this.$store.getters.user;
        //this.username = _user.name;
      }
    }
  }
};
</script>
