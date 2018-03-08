<template>
    <v-container>
      <div>
        <v-card id="scroll-container" class="ma-4 scroll-y" style="max-height: 500px" >
          <v-list subheader two-line>
              <v-subheader>Recent Chat</v-subheader>
            <v-flex  @mouseover="scrollToEnd" 
                  v-for="(message, index) in messages" :key="index">              
              <v-list-tile xs2  avatar>
                <v-list-tile-avatar class="pa-0">
                  <img :src="message.user.avatar">
                </v-list-tile-avatar>
                <v-subheader xs4 class="pa-0 ma-0">{{ message.user.name }}:</v-subheader>
                <v-list-tile-content class="ml-2" v-html="message.text">                  
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-list>
        </v-card>
      </div>
        <compose-message></compose-message>
    </v-container>

</template>

<script>
import ComposeMessage from "./ComposeMessage";
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
  methods: {
    scrollToEnd: function() {
      var container = this.$el.querySelector("#scroll-container");
      container.scrollTop = container.scrollHeight;
    }
  }
};
</script>

