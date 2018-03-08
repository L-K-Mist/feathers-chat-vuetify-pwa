<template>
  <v-flex>
    <v-layout>
      <v-list subheader>
          <v-subheader>Online Users</v-subheader>
          <v-flex v-for="(user, index) in users" :key="index">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              {{ user.name }}
            </v-list-tile-content>
          </v-list-tile>
          </v-flex>
        </v-list>
    </v-layout>
        <v-spacer></v-spacer>
                        <v-btn color="purple"
                  @click.prevent="logOut">
                  Log Out
                </v-btn> 
  </v-flex>
</template>

<script>
import ComposeMessage from "./ComposeMessage";
export default {
  components: {
    ComposeMessage
  },
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.replace({ name: "AppAuthentication" });
    }
  },
  // mounted() {
  //   return this.$store.dispatch("fetchUsers");
  // },
  watch: {
    users(value) {
      if (this.$store.getters.isAuthenticated) {
        // Make sure there's an object attached to user
        // this.usersData = value.data;

        console.log("watcher in user component", this.usersData);
      }
    }
  }
};
</script>