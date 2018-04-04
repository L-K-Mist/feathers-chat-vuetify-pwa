<template>
      <div>
        <v-card id="scroll-container" class="ma-4 scroll-y" style="max-height: 500px" >
          <v-list subheader two-line>
            <v-subheader>Recent Chat</v-subheader>
            <v-flex  
                  v-for="(message, index) in messages" :key="index">              
              <v-list-tile xs2>
                <!-- decided not to use the gravatar avatar, but you can if you want -->
                <!-- <v-list-tile-avatar class="pa-0">
                  <img :src="message.user.avatar">
                </v-list-tile-avatar> -->
                <v-layout column>
                  <v-subheader xs4 class="pa-0 ma-0">{{ message.user.email }}:</v-subheader>
                  <v-list-tile-content class="ml-2 caption" v-html="message.text">                  
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>
            </v-flex>
          </v-list>
        </v-card>
      <compose-message></compose-message>
      <v-btn @click.native.stop="logOut">Sign Out</v-btn>
    </div>
<!-- @mouseover="scrollToEnd"  -->
</template>

<script>
import ComposeMessage from "@/components/chat/ComposeMessage";
import debounce from "@/helpers/debounce";

export default {
  components: {
    ComposeMessage
  },
  // beforeUpdate() {
  //   this.scrollToEnd();
  // },
  data() {
    return {};
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  watch: {
    messages: debounce(function(newVal) {
      // Debounce comes in particularly handy if you want some real-time sliders
      // trigger scrollToEnd when a new message arrives
      this.scrollToEnd();
    }, 500)
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    scrollToEnd: function() {
      // A trick to get the chat to scroll to the newest messages ie bottom of the scrollable element. See first answer and the fiddle https://stackoverflow.com/questions/40730116/scroll-to-bottom-of-div-with-vue-js?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      var container = this.$el.querySelector("#scroll-container");
      container.scrollTop = container.scrollHeight;
    }
  }
};
</script>