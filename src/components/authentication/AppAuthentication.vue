<template>
  <v-container>
      <v-layout>
          <v-flex xs12 sm6  offset-sm3 justify-center>
              <v-card >
                <h3>Authentication Component Wrapper</h3>
                <!-- 3) PLACE the registered component into the template
                notice: CamelCase becomes hyphenated-component -->
                <log-in/>
                <sign-up/> 
              </v-card>
              <v-layout row>
                <v-btn color="purple"
                  @click.prevent="logOut">
                  Log Out
                </v-btn>  
                <v-btn color="purple"
                  @click.prevent="logUsers">
                  Log Users
                </v-btn>
                 <v-btn color="red"
                  @click.prevent="cleanUsers">
                  Flush Users
                </v-btn>  
              </v-layout>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
// Adding Components is a three-step process
import LogIn from "./LogIn"; // 1) IMPORT the File
import SignUp from "./SignUp";

export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    logUsers() {
      this.$store.dispatch("logUsers");
    },
    cleanUsers() {
      this.$store.dispatch("cleanUsers");
    }
  },
  components: {
    LogIn, // 2) REGISTER the Component
    SignUp
  }
};
// Notice: Both login and signup form placeholders are now visible, later will make visibility reactive
</script>

