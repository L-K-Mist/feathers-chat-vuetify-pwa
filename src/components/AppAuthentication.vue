<template>
  <v-container fill-height>
      <v-layout>
          <v-flex xs12 sm6  offset-sm3 justify-center>
              <v-card >
                <h3>Authentication Component Wrapper</h3>
                <!-- 3) PLACE the registered component into the template
                notice: CamelCase becomes hyphenated-component -->
                <log-in v-if="showLogin"/>
                <sign-up v-if="showRegister"/> 
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
// Adding Components is a three-step process
import LogIn from "@/components/authentication/LogIn"; // 1) IMPORT the File
import SignUp from "@/components/authentication/SignUp";

export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    showRegister() {
      return this.$store.getters.userRegister;
    },
    showLogin() {
      return this.$store.getters.userLogin;
    }
  },
  methods: {},
  components: {
    LogIn, // 2) REGISTER the Component
    SignUp
  },
  watch: {
    isAuthenticated(value) {
      if ((value = true)) {
        this.$router.replace({ name: "AppChat" });
      }
    }
  }
};
// Notice: Both login and signup form placeholders are now visible, later will make visibility reactive
</script>

