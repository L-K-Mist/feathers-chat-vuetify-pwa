 <template>
        <v-flex xs6>
            <v-card class="ma-1">
                <v-card-text>
                        <v-layout row wrap>
                        <v-flex xs12 sm10>
                            <h5>{{ name }}</h5>
                            <v-slider 
                              :disabled="disabled" 
                              :max="max" :value="sliderVal" 
                              @input="$emit('input', $event)" 
                              thumb-label step="10" 
                              prepend-icon="radio_button_checked" 
                              ticks></v-slider>
                           
                        </v-flex>
                        <v-flex xs3 sm2>
                            <v-text-field :value="sliderVal" @input="$emit('input', $event)" type="number"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
 </template>

 <script>
export default {
  props: {
    value: {
      default: 110,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    name: {
      default: "MaxiMillionRocks",
      type: String
    },
    progressVal: {
      default: 10,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    }
  },
  data() {
    return {
      iconTarget: "radio_button_checked",
      iconFire: "whatshot"
    };
  },
  computed: {
    sliderVal() {
      return this.value;
    },
    bufferVal() {
      return this.sliderVal / this.max * 100;
    }
  }
};
</script>