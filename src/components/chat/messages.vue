<template>
  <v-container>
      <v-layout fluid column>
          <v-flex fluid>

          </v-flex>
          <compose-message></compose-message>
      </v-layout>
  </v-container>
</template>

<script>
import ComposeMessage from "./ComposeMessage";
export default {
  components: {
    ComposeMessage
  }
};
</script>

