<template>
  <v-container class="ma-1">
      <v-layout row>
          <!-- <v-btn xs4>Send</v-btn> -->
          <v-text-field 
          prepend-icon="send"
          @keyup.enter="send"
          :prepend-icon-cb="send"
          label="Compose Message"
          v-model="message"
        ></v-text-field>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    send() {
      this.$store.dispatch("sendMessage", this.message);
      this.message = "";
    }
  }
};
</script>

