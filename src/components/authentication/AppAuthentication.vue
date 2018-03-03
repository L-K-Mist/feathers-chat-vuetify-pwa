<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs6 offset-xs3 justify-center>
              <v-card >
                <h3>Authentication Component Wrapper</h3>
                <!-- 3) PLACE the registered component into the template
                notice: CamelCase becomes hyphenated-component -->
                <log-in/>
                <sign-up/>   
              </v-card>
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
  methods: {},
  components: {
    LogIn, // 2) REGISTER the Component
    SignUp
  }
};
// Notice: Both login and signup form placeholders are now visible, later will make visibility reactive
</script>

