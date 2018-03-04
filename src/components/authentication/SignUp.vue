<template>
  <v-container>
      <v-layout row wrap>
          <v-flex align-content-center>
                <h3>Sign Up</h3>
                <v-form v-model="valid"
                     @submit.prevent="onSignup">
                    <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                    ></v-text-field>
                    <v-btn color="primary" type="submit">
                      Sign Up
                    </v-btn>
                </v-form>    
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // Notice SignUp.vue uses a different style here
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be at least 6 characters"
    ]
  }),
  computed: {
    user() {
      return {
        name: this.name,
        email: this.email,
        password: this.password
      };
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("createUser", this.user);
    }
  }
};
</script>