<template>
  <v-container>
      <v-card>
        <v-layout row>
            <v-layout>                
                <app-users></app-users>
            </v-layout>
            <v-layout> 
                <v-flex xs12 sm10>               
                    <app-messages></app-messages>
                </v-flex>
            </v-layout>            
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

