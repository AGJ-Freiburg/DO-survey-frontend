<template>
  <div v-if="questionindex == index" data-app>
    <v-card class="card">
      <!-- Überschrift -->
      <h1 class="card-headline">{{ header }}</h1>

      <!-- Info Popup -->
      <v-dialog v-if="!hide_help" v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="information-icon"
            color="#006AB3"
            fab
            v-bind="attrs"
            v-on="on"
          >
            <v-icon  x-large color="#fff">mdi-information-outline</v-icon>
          </v-btn>
        </template>

        <v-card class="modal-helper">
          <v-card-text>
            <slot name="helper"></slot>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              <p v-html="$ml.get('modal_help_close')"></p>
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

      <slot name="answers"></slot>
      <div class="nav-buttons">

        <v-btn
          x-large
          color="#99B533"
          style="font-weight: 600; margin: 10px"
          v-if="questionindex >= 1 && questionindex < maxindex"
          @click="$emit('backward')"
          
          ><v-icon>mdi-arrow-left</v-icon>
          <p v-html="$ml.get('button_back')"></p>
          </v-btn>

        <v-btn
          x-large
          color="#99B533"
          style="font-weight: 600; margin: 10px"
          v-if="questionindex < maxindex"
          @click="$emit('forward')"
          >
          <p v-html="$ml.get('button_next')"></p>
          <v-icon>mdi-arrow-right</v-icon></v-btn
        >
        <v-btn
            class="end-button"
            x-large
            color="#006AB3"
            style="font-weight: 600; margin: 10px"
            v-if="index == maxindex"
            @click="end"
            v-html="$ml.get('button_end')"
          ></v-btn>
      </div>
    </v-card>
    <!-- popup if fields are emtpy -->
  </div>
</template>

<script>
export default {
  name: "Questions",
  props: {
    forwarddialog: Boolean,
    header: String,
    index: Number,
    questionindex: Number,
    maxindex: Number,
    hide_help: Boolean,

  },

  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    end() {
      document.location.href = "https://cloud.agj-freiburg.de";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  width: 80%;
  margin-left: 5%;
  font-size: 28px;
  text-align: left;
}

.card {
  padding: 5%;
  padding-top: 30px;
  height: 75vh;
  width: 60vw;
}

.card-headline {
  margin-bottom: 20px;
  text-align: left;
}

.modal-helper {
  padding-top: 15px !important;
  padding-bottom: 10px;
  font-size: 22px;
}

.modal-helper h2 {
  margin-top: 20px !important;
  font-size: 22px;
}

.modal-helper-text {
  margin-top: 10px;
}

.information-icon {
  position: absolute;
  right: 20px;
  top: 20px;
}

.nav-buttons {
  position: absolute;
  bottom: -30px;
  width: 90%;
}

.end-button {
  color: #fff !important;
  font-weight: 600;
  margin: 10px;
}

@media screen and (max-width: 1000px) {
  .card {
    padding: 5%;
    height: 75vh;
    width: 70vw;
  }
}

@media screen and (max-width: 700px) {
  .card {
    padding: 5% 0 5% 0;
    height: 80vh;
    width: 90vw;
  }

  .nav-buttons {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
  }

  h1 {
    width: 80%;
    margin-left: 10%;
    margin-top: 2%;
    font-size: 20px;
    text-align: left;
  }

  .information-icon {
    position: absolute;
    right: -15px;
    top: -15px;
  }
}
</style>
