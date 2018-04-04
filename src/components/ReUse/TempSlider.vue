 <template>
        <v-flex v-bind="{[`xs${mainCardWidth}`]:true}">
            <v-card class="ma-2">
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
                              ticks
                              opacity="0.2"
                              hint="Setting Target Temperature in Celcius"></v-slider>
                                <v-layout row>
                                <div name="pre-spacer" class="text-xs-left" style="width: 75px; height: 40px"><v-icon>whatshot</v-icon></div>
                                <v-progress-linear
                                    :buffer-value="bufferVal"
                                    :value="progressVal*100/max"
                                    buffer
                                    color="red lighten-1"
                                    background-color="red lighten-3"
                                    background-opacity="0.7"
                                    style="margin-right: 15px; margin-top:8px"
                                    >
                                </v-progress-linear>
                                </v-layout>                               
                        </v-flex>
                        <v-flex xs3 sm2>
                            <v-text-field  :value="sliderVal" @input="$emit('input', $event)" type="number"
                            hint="Target Temp"
                            persistent-hint></v-text-field>
                            <v-text-field disabled :value="progressVal" @input="$emit('input', $event)" type="number"
                            hint="Actual Temp"
                            persistent-hint></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
 </template>

 <script>
export default {
  props: {
    // The parent component can set these props
    value: {
      default: 110,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    name: {
      default: "MaxiMillion",
      type: String
    },
    progressVal: {
      default: 10,
      type: Number
    },
    max: {
      default: 200,
      type: Number
    },
    mainCardWidth: {
      default: 6,
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
<style scoped>
/* .slider__track__container {
} */
</style>

 