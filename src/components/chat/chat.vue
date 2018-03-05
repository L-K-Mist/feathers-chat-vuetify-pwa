<template>
  <v-container>
      <v-card>
        <v-layout row>
            <app-users></app-users>
            <app-messages></app-messages>
        </v-layout>
      </v-card>
  </v-container>
</template>

<script>
import AppMessages from "./messages";
import AppUsers from "./users";

export default {
  data() {
    return {};
  },
  components: {
    AppMessages,
    AppUsers
  }
};
</script>

