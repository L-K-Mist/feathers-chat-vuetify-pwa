<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Looks like you're not logged in yet?</v-card-title>
        <v-card-text>Is this your first time logging in to this app? Then you'll need to register</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="myDialog = false">Yes, let me register</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="ialog = false">No, let me log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  computed: {
    dialog: {
      get() {
        return this.$store.getters.showLoginGuide;
      },
      set(dialog) {
        this.$store.dispatch("showLoginGuide", dialog);
      }
    }
  }
};
</script>