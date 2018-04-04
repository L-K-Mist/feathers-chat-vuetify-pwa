<template>
  <div id="app">
    <v-app dark>
      <user-guide-dialogue :dialog="loginDialogue.show"></user-guide-dialogue>
      <v-navigation-drawer
        name="chat-drawer"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <h4>Chat Drawer</h4>
        <app-chat></app-chat>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-btn
          icon
          @click.native.stop="drawer = !drawer"
        >
          <v-icon>message</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
            <v-navigation-drawer
        temporary
        fixed
        :right="right"
        v-model="rightDrawer"
        app
      >
        <v-list>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <div class="mr-3">&copy; 2018   </div>   
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import WelcomeView from "@/components/WelcomeView";
import AppChat from "@/components/chat";
import UserGuideDialogue from "@/components/UserGuideDialogue";

export default {
  mounted() {
    this.$store.dispatch("signInAuto");
  },
  //name: "p2d-controller",
  data: () => ({
    loginDialogue: {
      // should actually move this to store so that where
      show: false
    },

    clipped: true,
    drawer: true,
    fixed: false,
    items: [
      { icon: "apps", title: "Welcome", to: "/" },
      { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
    ],
    right: true,
    rightDrawer: false,
    title: "Feathers-Vuetify-Chat"
  }),
  computed: {
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  },
  methods: {
    // showConnectDialog() {
    // }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        // Make sure there's an authenticated user
        this.$store.dispatch("fetchUsers");
        this.$store.dispatch("fetchMessages"); // Now that we know there's an authenticated user, we can request messages from the database for our store. - BECAUSE - if we trigger a fetch before there's a logged in user, feathers throws an error.
      } else {
        this.$store.dispatch("showLoginGuide", true);
      }
    }
  },
  components: {
    AppChat,
    UserGuideDialogue
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
</style>
