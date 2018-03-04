<template>
  <v-container>
      <v-layout row wrap>
          <v-flex align-content-center>

                <h3>Log In</h3>
                <v-form v-model="valid"
                    @submit.prevent="onLogin">
                    <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    v-model="password"
                    :rules="emailRules"
                    required
                    ></v-text-field>
                    <v-btn color='primary' type="submit">
                      Log In
                    </v-btn>
                </v-form>

          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    // Notice LogIn.vue uses a different style here. I prefer this style but just showing for reference
    return {
      valid: false,
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
    };
  },
  methods: {
    onLogin() {}
  }
};
</script>