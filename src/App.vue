<template>
  <v-app>
    <user-guide-dialogue :dialog="loginDialogue.show"></user-guide-dialogue>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title  v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  to="/">
        <v-icon>home</v-icon>Home
      </v-btn>
      <v-btn  to="chat">
        <v-icon>mail</v-icon>Chat
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <h5 v-if="showWelcome" style="position: absolute; top: 80px; right: 20px">
        Hello {{ user.name }}, welcome back
      </h5>
        <transition name="scale-transition" mode="out-in">
            <router-view></router-view>
        </transition>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
        <v-layout column align-center>
          <v-flex xs10>
            <p>You might decide to embed the chat component here instead</p>
          </v-flex>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import UserGuideDialogue from "./components/UserGuideDialogue";
export default {
  name: "App",
  components: {
    UserGuideDialogue
  },
  mounted() {
    this.$store.dispatch("signInAuto");
  },
  data() {
    return {
      loginDialogue: {
        show: false
      },
      showWelcome: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "A Vue & Vuetify PWA with Real Time Chat by FeathersJs"
    };
  },
  computed: {
    // This watched computed property pattern is advised for async operations
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        // Make sure there's an authenticated user
        this.showWelcome = true;
        this.$store.dispatch("fetchUsers");
        this.$store.dispatch("fetchMessages"); // Now that we know there's an authenticated user, we can request messages from the database for our store. - BECAUSE - if we trigger a fetch before there's a logged in user, feathers throws an error.
        //this.$router.replace({ name: "AppChat" });
      } else {
        this.$store.dispatch("showLoginGuide", true);
      }
    }
  }
};
</script>
