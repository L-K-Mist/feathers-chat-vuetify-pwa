<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("signInAuto");
  },
  data() {
    return {
      fixed: false
    };
  },
  name: "App"
};
</script>
