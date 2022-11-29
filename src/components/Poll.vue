<template>
  <div class="global" data-app>
    <h1 v-if="errored">
      <p>Die Umfrage ist derzeit nicht verfügbar</p>
    </h1>
    <!-- START SCREEN -->
    <div v-else>
      <a class="impressum" href="https://cloud.agj-freiburg.de/impressum/" target="_blank" v-html="$ml.get('legal_footer')"></a>
      <!-- Mulilanguage -->
      <div id="start-screen" v-if="!started">
        <v-card class="intro-text">
          <div class="start-screen-left">
            <img id="start-screen-logo" src="../assets/cloud-key-agj.png" />
            <h3>Language / Sprache:</h3>
            <v-select class="ml" v-model="lang" :items="$ml.list" menu-props="auto" label="Select" hide-details prepend-icon="mdi-translate" single-line></v-select>
            <img id="start-screen-animation" src="../assets/checklist.gif" />
          </div>

          <div class="start-screen-right">
            <div class="start-screen-mobile-header">
              <img id="start-screen-animation" src="../assets/checklist.gif" />
              <div class="ml-mobile">
                <h3>Sprache / Language:</h3>
                <v-select class="ml" v-model="lang" :items="$ml.list" menu-props="auto" label="Select" hide-details prepend-icon="mdi-translate" single-line></v-select>
                <br />
              </div>
            </div>
            <div class="start-screen-text">
              <h1 class="start-screen-desktop-header" v-html="$ml.get('landing_title')"></h1>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('landing_text')"></p>
            </div>
            <div class="start-screen-checks">
              <v-form id="start-screen-checkbox" ref="form" v-model="valid" lazy-validation>
                <v-checkbox v-model="legal" :rules="[(v) => !!v || $ml.get('landing_dsgvo_error')]" required>
                  <template v-slot:label>
                    <div :id="lang == 'Русский' || lang == 'Ελληνική' ? 'start-screen-checkbox-text-ru-gr' : 'start-screen-checkbox-text'" @click.stop>
                      <i v-if="lang != 'Türkçe'" v-html="$ml.get('landing_disclaimer_dsgvo')"></i><a v-if="lang != 'Türkçe'" href="https://agj-freiburg.de/datenschutz"> <i v-html="$ml.get('dsgvo_link')"></i></a> <a v-if="lang == 'Türkçe'" href="https://agj-freiburg.de/datenschutz"> <i v-html="$ml.get('dsgvo_link')"></i></a
                      ><i v-if="lang == 'Türkçe'" v-html="$ml.get('landing_disclaimer_dsgvo')"></i>
                    </div>
                  </template>
                </v-checkbox>
              </v-form>
              <v-form id="start-screen-checkbox2" ref="form" v-model="valid" lazy-validation>
                <v-checkbox v-model="legal2" :rules="[(v) => !!v || $ml.get('landing_homeless_error')]" required>
                  <template v-slot:label>
                    <div :id="lang == 'Русский' || lang == 'Ελληνική' ? 'start-screen-checkbox-text-ru-gr' : 'start-screen-checkbox-text'">
                      <i v-html="$ml.get('landing_disclaimer_homeless')"></i>
                    </div>
                  </template>
                </v-checkbox>
              </v-form>

              <v-btn :disabled="!valid" id="start-screen-startbutton" color="#99B533" x-large class="mr-4" @click="validate">
                <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('button_start')"></p>
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>

      <!-- UMFRAGE GESTARTET -->
      <div id="umfrage-screen" v-if="started">
        <!-- PROGRESS BAR -->
        <v-progress-linear id="progress-bar" v-model="progress" color="#fff" height="30"
          ><p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('question_footer')"></p>
          : {{ Math.ceil(((this.index + 1) / (this.questionamount + 1)) * 100) }}%
        </v-progress-linear>

        <!-- UMFRAGE -->
        <div v-if="!polldone && started">
          <question :header="$ml.get('t0_tutorial_one_title')" :index="index" :questionindex="0" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="12">
                    <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t0_tech_preamble')"></p>
                    <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t0_tutorial_one_text')"></p>

                    <v-btn class="information-icon" color="#006AB3" fab>
                      <v-icon x-large color="#fff">mdi-information-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q1_header')" :index="index" :questionindex="1" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_1')" v-model="checkboxes[1][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_2')" v-model="checkboxes[1][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_3')" v-model="checkboxes[1][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_4')" v-model="checkboxes[1][3]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_5')" v-model="checkboxes[1][4]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_6')" v-model="checkboxes[1][5]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_7')" v-model="checkboxes[1][6]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_8')" v-model="checkboxes[1][7]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q1_answer_9')" v-model="checkboxes[1][8]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q1_help_text_top')"></p>
              <v-icon>mdi-wifi</v-icon>
              <v-spacer style="padding: 10px"></v-spacer>

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q1_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q2_header')" :index="index" :questionindex="2" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[2]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q2_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q2_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q2_answer_3')" :value="3"></v-radio>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q2_answer_4')" :value="4"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q2_answer_5')" :value="5"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>

              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q2_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q2_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q3_header')" :index="index" :questionindex="3" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[3]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q3_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q3_answer_2')" :value="2"></v-radio>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q3_answer_3')" :value="3"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q3_answer_4')" :value="4"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q3_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q3_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q4_header')" :index="index" :questionindex="4" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q4_answer_1')" v-model="checkboxes[4][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q4_answer_2')" v-model="checkboxes[4][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q4_answer_3')" v-model="checkboxes[4][2]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q4_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q4_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q5_header')" :index="index" :questionindex="5" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[5]">
                <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q5_subtitle')" class="incard-text-tut"></p>
                <v-spacer style="padding: 10px"></v-spacer>
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q5_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q5_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q5_answer_3')" :value="3"></v-radio>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q5_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q5_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q6_header')" :index="index" :questionindex="6" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_1')" v-model="checkboxes[6][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_2')" v-model="checkboxes[6][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_3')" v-model="checkboxes[6][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_4')" v-model="checkboxes[6][3]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_5')" v-model="checkboxes[6][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_6')" v-model="checkboxes[6][5]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_7')" v-model="checkboxes[6][6]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q6_answer_8')" v-model="checkboxes[6][7]"></v-checkbox>
                    <v-text-field v-if="checkboxes[6][7] == 1" v-model="additiontext[6]" class="textinput" color="purple darken-2" :label="$ml.get('q6_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q6_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q6_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q7_header')" :index="index" :questionindex="7" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[7]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q7_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q7_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q7_answer_3')" :value="3"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q7_help_text_top')"></p>
              <v-icon>mdi-wifi</v-icon>
              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q7_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q8_header')" :index="index" :questionindex="8" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[8]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q8_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q8_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q8_answer_3')" :value="3"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q8_answer_4')" :value="4"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q8_help_text_top')"></p>
              <v-icon>mdi-wifi</v-icon>
              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q8_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('t9_title')" :index="index" :questionindex="9" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t9_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q10_header')" :index="index" :questionindex="10" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[10]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q10_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q10_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q10_answer_3')" :value="3"></v-radio>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q10_answer_4')" :value="4"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q10_answer_5')" :value="5"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q10_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q10_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q11_header')" :index="index" :questionindex="11" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_1')" v-model="checkboxes[11][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_2')" v-model="checkboxes[11][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_3')" v-model="checkboxes[11][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_4')" v-model="checkboxes[11][3]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_5')" v-model="checkboxes[11][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_6')" v-model="checkboxes[11][5]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q11_answer_7')" v-model="checkboxes[11][6]"></v-checkbox>
                    <v-text-field v-if="checkboxes[11][6] == 1" v-model="additiontext[11]" class="textinput" color="purple darken-2" :label="$ml.get('q11_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q11_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q11_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q12_header')" :index="index" :questionindex="12" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_1')" v-model="checkboxes[12][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_2')" v-model="checkboxes[12][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_3')" v-model="checkboxes[12][2]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_4')" v-model="checkboxes[12][3]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_5')" v-model="checkboxes[12][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q12_answer_6')" v-model="checkboxes[12][5]"></v-checkbox>
                    <v-text-field v-if="checkboxes[12][5] == 1" v-model="additiontext[12]" class="textinput" color="purple darken-2" :label="$ml.get('q12_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q12_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q12_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q13_header')" :index="index" :questionindex="13" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[13]">
                <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q13_group_1')" class="incard-text-tut"></p>
                <v-spacer style="padding: 10px"></v-spacer>
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q13_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q13_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q13_answer_3')" :value="3"></v-radio>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q13_answer_4')" :value="4"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q13_answer_5')" :value="5"></v-radio>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q13_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q13_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q14_header')" :index="index" :questionindex="14" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[14]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q14_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q14_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q14_answer_3')" :value="3"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q14_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q14_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q15_header')" :index="index" :questionindex="15" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[15]">
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q15_answer_1')" :value="1"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q15_answer_2')" :value="2"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q15_answer_3')" :value="3"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q15_answer_4')" :value="4"></v-radio>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q15_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q15_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('t16_title')" :index="index" :questionindex="16" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t16_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q17_header')" :index="index" :questionindex="17" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_1')" v-model="checkboxes[17][0]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_2')" v-model="checkboxes[17][1]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_3')" v-model="checkboxes[17][2]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_4')" v-model="checkboxes[17][3]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_5')" v-model="checkboxes[17][4]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_6')" v-model="checkboxes[17][5]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_7')" v-model="checkboxes[17][6]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_8')" v-model="checkboxes[17][7]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q17_answer_9')" v-model="checkboxes[17][8]"></v-checkbox>
                    <v-text-field v-if="checkboxes[17][8] == 1" v-model="additiontext[17]" class="textinput" color="purple darken-2" :label="$ml.get('q17_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q17_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q17_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q18_header')" :index="index" :questionindex="18" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_1')" v-model="checkboxes[18][0]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_2')" v-model="checkboxes[18][1]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_3')" v-model="checkboxes[18][2]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_4')" v-model="checkboxes[18][3]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_5')" v-model="checkboxes[18][4]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_6')" v-model="checkboxes[18][5]"></v-checkbox>
                    <v-text-field v-if="checkboxes[18][5] == 1" v-model="additiontext[18]" class="textinput" color="purple darken-2" :label="$ml.get('q18_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q18_answer_7')" v-model="checkboxes[18][6]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q18_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q18_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q19_header')" :index="index" :questionindex="19" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q19_answer_1')" v-model="checkboxes[19][0]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q19_answer_2')" v-model="checkboxes[19][1]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q19_answer_3')" v-model="checkboxes[19][2]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q19_answer_4')" v-model="checkboxes[19][3]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q19_answer_5')" v-model="checkboxes[19][4]"></v-checkbox>
                    <v-text-field v-if="checkboxes[index][4] == 1" v-model="additiontext[19]" class="textinput" color="purple darken-2" :label="$ml.get('q19_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q19_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q19_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q20_header')" :index="index" :questionindex="20" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <v-radio-group class="radio-group" v-model="radiogroups[20]">
                <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q20_subtitle')" class="incard-text-tut"></p>
                <v-spacer style="padding: 10px"></v-spacer>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q20_answer_1')" :value="1"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q20_answer_2')" :value="2"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q20_answer_3')" :value="3"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q20_answer_4')" :value="4"></v-radio>
                <v-text-field v-if="radiogroups[20] == 4" v-model="additiontext[20]" class="textinput" color="purple darken-2" :label="$ml.get('q20_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q20_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q20_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q21_header')" :index="index" :questionindex="21" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_1')" v-model="checkboxes[21][0]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_2')" v-model="checkboxes[21][1]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_3')" v-model="checkboxes[21][2]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_4')" v-model="checkboxes[21][3]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_5')" v-model="checkboxes[21][4]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q21_answer_6')" v-model="checkboxes[21][5]"></v-checkbox>
                    <v-text-field v-if="checkboxes[21][5] == 1" v-model="additiontext[21]" class="textinput" color="purple darken-2" :label="$ml.get('q21_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q21_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q21_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q22_header')" :index="index" :questionindex="22" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox v-if="filter.has_mobile_phone > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q22_answer_1')" v-model="checkboxes[22][0]"></v-checkbox>
                    <v-checkbox v-if="filter.uses_email > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q22_answer_2')" v-model="checkboxes[22][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q22_answer_3')" v-model="checkboxes[22][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q22_answer_4')" v-model="checkboxes[22][3]"></v-checkbox>
                    <v-text-field v-if="checkboxes[22][3] == 1" v-model="additiontext[22]" class="textinput" color="purple darken-2" :label="$ml.get('q22_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q22_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q22_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q23_header')" :index="index" :questionindex="23" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q23_answer_1')" v-model="checkboxes[23][0]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q23_answer_2')" v-model="checkboxes[23][1]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q23_answer_3')" v-model="checkboxes[23][2]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q23_answer_4')" v-model="checkboxes[23][3]"></v-checkbox>
                    <v-text-field v-if="checkboxes[23][3] == 1" v-model="additiontext[23]" class="textinput" color="purple darken-2" :label="$ml.get('q23_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q23_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q23_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q24_header')" :index="index" :questionindex="24" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_1')" v-model="checkboxes[24][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_2')" v-model="checkboxes[24][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_3')" v-model="checkboxes[24][2]"></v-checkbox>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_4')" v-model="checkboxes[24][3]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_5')" v-model="checkboxes[24][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q24_answer_6')" v-model="checkboxes[24][5]"></v-checkbox>
                    <v-text-field v-if="checkboxes[24][5] == 1" v-model="additiontext[24]" class="textinput" color="purple darken-2" :label="$ml.get('q24_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q24_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q24_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q25_header')" :index="index" :questionindex="25" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_1')" v-model="checkboxes[25][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_2')" v-model="checkboxes[25][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_3')" v-model="checkboxes[25][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_4')" v-model="checkboxes[25][3]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_5')" v-model="checkboxes[25][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_6')" v-model="checkboxes[25][5]"></v-checkbox>
                    <v-checkbox v-if="filter.uses_internet > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_7')" v-model="checkboxes[25][6]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q25_answer_8')" v-model="checkboxes[25][7]"></v-checkbox>
                    <v-text-field v-if="checkboxes[25][7] == 1" v-model="additiontext[25]" class="textinput" color="purple darken-2" :label="$ml.get('q25_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q25_help_text_top')"></p>
              <br />
              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q25_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('t26_title')" :index="index" :questionindex="26" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t26_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q27_header')" :index="index" :questionindex="27" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_1')" v-model="checkboxes[27][0]"></v-checkbox>
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_2')" v-model="checkboxes[27][1]"></v-checkbox>
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_3')" v-model="checkboxes[27][2]"></v-checkbox>
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_4')" v-model="checkboxes[27][3]"></v-checkbox>
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_5')" v-model="checkboxes[27][4]"></v-checkbox>
                    <v-text-field v-if="checkboxes[27][4] == 1" v-model="additiontext[27]" class="textinput align-center justify-center" color="purple darken-2" :label="$ml.get('q27_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <v-checkbox class="checkbox align-center justify-center" :label="$ml.get('q27_answer_6')" v-model="checkboxes[27][5]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q27_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q27_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q28_header')" :index="index" :questionindex="28" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox v-if="filter.has_documents_perso > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q28_answer_1')" v-model="checkboxes[28][0]"></v-checkbox>
                    <v-checkbox v-if="filter.has_documents_health_insurance_card > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q28_answer_2')" v-model="checkboxes[28][1]"></v-checkbox>
                    <v-checkbox v-if="filter.has_documents_passport > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q28_answer_3')" v-model="checkboxes[28][2]"></v-checkbox>
                    <v-checkbox v-if="filter.has_documents_birth_certificate > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q28_answer_4')" v-model="checkboxes[28][3]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q28_answer_5')" v-model="checkboxes[28][4]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q28_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q28_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q29_header')" :index="index" :questionindex="29" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_1')" v-model="checkboxes[29][0]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_2')" v-model="checkboxes[29][1]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_3')" v-model="checkboxes[29][2]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_4')" v-model="checkboxes[29][3]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_5')" v-model="checkboxes[29][4]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_6')" v-model="checkboxes[29][5]"></v-checkbox>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q29_answer_7')" v-model="checkboxes[29][6]"></v-checkbox>
                    <v-text-field v-if="checkboxes[29][6] == 1" v-model="additiontext[29]" class="textinput" color="purple darken-2" :label="$ml.get('q29_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q29_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q29_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q30_header')" :index="index" :questionindex="30" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[30]">
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_1')" :value="1"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_2')" :value="2"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_3')" :value="3"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_4')" :value="4"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_5')" :value="5"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q30_answer_6')" :value="6"></v-radio>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q30_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q30_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('t31_title')" :index="index" :questionindex="31" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t31_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q32_header')" :index="index" :questionindex="32" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-text-field v-if="checkboxes[32][0] == 0" v-model="additiontext[32]" class="textinput" color="purple darken-2" :label="$ml.get('q32_textbox_1_placeholder')" required type="number" :rules="numberRule"></v-text-field>
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q32_answer_1')" v-model="checkboxes[32][0]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q32_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q33_header')" :index="index" :questionindex="33" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[33]">
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q33_answer_1')" :value="1"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q33_answer_2')" :value="2"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q33_answer_3')" :value="3"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q33_answer_4')" :value="4"></v-radio>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q33_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q34_header')" :index="index" :questionindex="34" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[34]">
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_1')" :value="1"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_2')" :value="2"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_3')" :value="3"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_4')" :value="4"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_5')" :value="5"></v-radio>
                <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q34_answer_6')" :value="6"></v-radio>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q34_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q34_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q35_header')" :index="index" :questionindex="35" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <div class="options">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_1')" v-model="checkboxes[35][0]"></v-checkbox>

                    <v-checkbox v-if="filter.visits_social_institution > 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_2')" v-model="checkboxes[35][1]"></v-checkbox>

                    <v-checkbox v-if="filter.is_homeless < 0" :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_3')" v-model="checkboxes[35][2]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_4')" v-model="checkboxes[35][3]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_5')" v-model="checkboxes[35][4]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_6')" v-model="checkboxes[35][5]"></v-checkbox>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_7')" v-model="checkboxes[35][6]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_8')" v-model="checkboxes[35][7]"></v-checkbox>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_9')" v-model="checkboxes[35][8]"></v-checkbox>

                    <v-text-field v-if="checkboxes[35][8] == 1" v-model="additiontext[35]" class="textinput" color="purple darken-2" :label="$ml.get('q35_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>

                    <v-checkbox :class="lang == 'Русский' || lang == 'Ελληνική' ? 'checkbox-ru-gr' : 'checkbox'" :label="$ml.get('q35_answer_10')" v-model="checkboxes[35][9]"></v-checkbox>
                  </v-col>
                </v-row>
              </div>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q35_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q35_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('q36_header')" :index="index" :questionindex="36" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="false">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->

              <v-radio-group class="radio-group" v-model="radiogroups[36]">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_1')" :value="1"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_2')" :value="2"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_3')" :value="3"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_4')" :value="4"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_5')" :value="5"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_6')" :value="6"></v-radio>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="6">
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_7')" :value="7"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_8')" :value="8"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_9')" :value="9"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_10')" :value="10"></v-radio>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_11')" :value="11"></v-radio>
                    <v-text-field v-if="radiogroups[36] == 11" v-model="additiontext[36]" class="textinput" color="purple darken-2" :label="$ml.get('q36_textbox_placeholder')" required counter maxlength="450" filled rounded></v-text-field>
                    <v-radio :class="lang == 'Русский' || lang == 'Ελληνική' ? 'radio-ru-gr' : 'radio'" :label="$ml.get('q36_answer_12')" :value="12"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- END of  content -->
            </template>
            <template v-slot:helper>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content if the help modal -->
              <h2 v-html="$ml.get('modal_help_top_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q36_help_text_top')"></p>

              <br />

              <h2 v-html="$ml.get('modal_help_bottom_header')"></h2>
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q36_help_text_bot')"></p>

              <!-- Modal content end -->
            </template>
          </question>

          <question :header="$ml.get('t37_title')" :index="index" :questionindex="37" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t37_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('q38_header')" :index="index" :questionindex="38" :maxindex="questionamount" @forward="forward(false, false)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <div class="options" style="display: block">
                <!-- ------------------------------------------- -->
                <!-- Here is the complete content of the answers -->
                <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" v-html="$ml.get('q38_flufftext')" class="incard-text-tut"></p>
                <v-spacer style="padding: 10px"></v-spacer>
                <v-textarea v-model="additiontext[38]" color="purple darken-2" :label="$ml.get('q38_textbox_placeholder')" required rows="10" row-height="30" auto-grow filled rounded style="width: 100%; height: auto" maxlength="2200"></v-textarea>

                <!-- END of  content -->
              </div>
            </template>
            <template v-slot:helper> </template>
          </question>

          <question :header="$ml.get('t39_title')" :index="index" :questionindex="39" :maxindex="questionamount" @forward="forward(true, true)" @backward="backward()" :hide_help="true">
            <template v-slot:answers>
              <!-- ------------------------------------------- -->
              <!-- Here is the complete content of the answers -->
              <p :class="lang == 'Русский' || lang == 'Ελληνική' ? 'p-ru-gr' : () => {}" class="text_tut" v-html="$ml.get('t39_text')"></p>

              <!-- END of  content -->
            </template>
            <template v-slot:helper> </template>
          </question>
        </div>
      </div>
    </div>

    <v-dialog v-model="forwarddialog" width="500">
      <v-card class="modal-helper">
        <h2 v-html="$ml.get('modal_no_answers_title')"></h2>
        <v-card-text class="modal-helper-text" v-html="$ml.get('modal_no_answers_text')"> </v-card-text>

        <v-divider> </v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="#99B533" text @click="stay" v-html="$ml.get('modal_no_answers_return')"></v-btn>

          <v-btn color="primary" text @click="forwardforce(false)" v-html="$ml.get('modal_no_answers_forward')"> </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <footer>
      <cookie-law theme="dark-lime" :buttonText="$ml.get('dsgvo_cookie_button')">
        <div slot="message" v-html="$ml.get('dsgvo_cookie_text')"></div>
      </cookie-law>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import question from "./Question.vue";
import CookieLaw from "vue-cookie-law";

axios.defaults.baseURL = "https://umfrage.daten-oase.org:1337";

export default {
  name: "Poll",
  props: {},

  components: {
    question,
    CookieLaw,
  },

  data() {
    return {
      index: 0,

      stack_index: [],

      // MODFIY IN THE END
      questionamount: 39,

      filter: {
        visits_social_institution: 0,
        insitution_has_wifi: 0,
        uses_internet: 0,
        uses_email: 0,
        has_mobile_phone: 0,
        has_smartphone: 0,
        has_mobile_internet: 0,
        wants_share: 0,
        wants_up_and_download: 0,
        is_homeless: 0,
        has_documents: 0,
        has_documents_perso: 0,
        has_documents_health_insurance_card: 0,
        has_documents_passport: 0,
        has_documents_birth_certificate: 0,
      },

      lang: "",
      errored: false,
      submitted: false,

      progress: 0,
      started: false,
      valid: true,
      legal: false,
      legal2: false,

      created: undefined,

      forwarddialog: false,

      // radiogroups 2D array for all questions
      radiogroups: new Array(100).fill(0),

      // additional text will be stored here
      additiontext: new Array(100).fill(""),

      // checkboxmod
      // every question with a queckbox need its own array!!!!!!!!
      checkboxes: {
        0: new Array(30).fill(0),

        1: new Array(30).fill(0),
        2: new Array(30).fill(0),
        3: new Array(30).fill(0),
        4: new Array(30).fill(0),
        5: new Array(30).fill(0),
        6: new Array(30).fill(0),
        7: new Array(30).fill(0),
        8: new Array(30).fill(0),
        9: new Array(30).fill(0),
        10: new Array(30).fill(0),
        11: new Array(30).fill(0),
        12: new Array(30).fill(0),
        13: new Array(30).fill(0),
        14: new Array(30).fill(0),
        15: new Array(30).fill(0),
        16: new Array(30).fill(0),
        17: new Array(30).fill(0),
        18: new Array(30).fill(0),
        19: new Array(30).fill(0),
        20: new Array(30).fill(0),
        21: new Array(30).fill(0),
        22: new Array(30).fill(0),
        23: new Array(30).fill(0),
        24: new Array(30).fill(0),
        25: new Array(30).fill(0),
        26: new Array(30).fill(0),
        27: new Array(30).fill(0),
        28: new Array(30).fill(0),
        29: new Array(30).fill(0),
        30: new Array(30).fill(0),
        31: new Array(30).fill(0),
        32: new Array(30).fill(0),
        33: new Array(30).fill(0),
        34: new Array(30).fill(0),
        35: new Array(30).fill(0),
        36: new Array(30).fill(0),
        37: new Array(30).fill(0),
        38: new Array(30).fill(0),
        39: new Array(30).fill(0),
        40: new Array(30).fill(0),
        41: new Array(30).fill(0),
      },

      home: "",
      polldone: false,
      code: "",

      numberRule: [
        (val) => {
          if (!isNaN(parseFloat(val)) && val >= 10 && val <= 100) return true;
          return this.$ml.get("q32_error");
        },
      ],
      polls: {},
    };
  },
  watch: {
    lang() {
      this.$ml.change(this.lang);
    },
  },

  mounted() {
    this.index = 0;
    this.lang = this.$ml.current;
    axios
      .get("/startpoll")
      .then((response) => {
        // JSON responses are automatically parsed.
        console.log(response);
        this.code = response.data;
        this.getNow();
      })
      .catch((e) => {
        console.log(e);
        this.errored = true;
      });
  },

  methods: {
    // safe answer in the backend
    saveanswer(index, skipnetwork, callback) {
      let potenz = 0;
      let cb = 0;

      // change checkbox information in single binary representation
      this.checkboxes[index].forEach((val) => {
        if (val) {
          cb = cb + Math.pow(2, potenz);
        }
        console.log(val, Math.pow(2, potenz));

        potenz = potenz + 1;
      });

      // some stept in th poll do not requiere networking
      if (!skipnetwork) {
        axios
          .put("/saveanswer", {
            created: this.created,
            id: index,
            code: this.code,
            radiogroup: this.radiogroups[index],
            text: this.additiontext[index],
            cb: cb,
          })
          .then((response) => {
            // JSON responses are automatically parsed.
            console.log(response);
            this.submitted = true;
            callback();
          })
          .catch((e) => {
            console.log(e);
            callback();
          });
      } else {
        console.log("networking skipped");
        callback();
      }
    },

    // get current time
    getNow() {
      const today = new Date();
      const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.created = dateTime;
    },

    // validate if user agreed GPDR
    validate() {
      // ugli
      this.legal && this.legal2 ? (this.started = true) : () => {};
      this.$refs.form.validate();
    },

    // skip "you really want to continue?" dialog
    forwardforce(skipnetwork) {
      this.forwarddialog = false;
      this.forward(true, skipnetwork);
    },

    // skip "you really want to continue?" dialog
    stay() {
      this.forwarddialog = false;
    },

    // go to next question
    forward(force, skipnetwork) {
      // determine if the user inserted something
      var temp = false;
      if (force) {
        temp = true;
      }

      this.checkboxes[this.index].forEach((cb) => {
        if (cb > 0 || cb) {
          temp = true;
        }
      });

      if (this.radiogroups[this.index] != 0) {
        temp = true;
      }

      if (this.additiontext[this.index].length > "") {
        temp = true;
      }

      /////////////////////////////
      // FILTER LOGIC
      // here filters will be updated
      /////////////////////////////

      // first check for actual question
      if (this.index == 1) {
        // check answers... depending on question
        if (this.checkboxes[this.index][7]) {
          // update a filter
          // has one a sets to 1
          this.filter.has_mobile_internet = 1;
        } else {
          // has noen and filter is globalle set to -1
          this.filter.has_mobile_internet = -1;
        }
        if (this.checkboxes[this.index][8] && !this.checkboxes[this.index][7] && !this.checkboxes[this.index][6] && !this.checkboxes[this.index][5] && !this.checkboxes[this.index][4] && !this.checkboxes[this.index][3] && !this.checkboxes[this.index][2] && !this.checkboxes[this.index][1] && !this.checkboxes[this.index][0]) {
          this.filter.uses_internet = -1;
        } else {
          this.filter.uses_internet = 1;
        }
      }

      if (this.index == 2) {
        if (this.radiogroups[this.index] == 2 || this.radiogroups[this.index] == 3) {
          this.filter.has_smartphone = 1;
        } else {
          this.filter.has_smartphone = -1;
        }
        if (this.radiogroups[this.index] == 4) {
          this.filter.has_mobile_phone = -1;
        } else {
          this.filter.has_mobile_phone = 1;
        }
      }

      if (this.index == 5) {
        if (this.radiogroups[this.index] == 1) {
          this.filter.visits_social_institution = 1;
        } else {
          this.filter.visits_social_institution = -1;
        }
      }

      if (this.index == 7) {
        if (this.radiogroups[this.index] == 1) {
          this.filter.insitution_has_wifi = 1;
        } else {
          this.filter.insitution_has_wifi = -1;
        }
      }

      if (this.index == 10) {
        if (this.radiogroups[this.index] == 1 || this.radiogroups[this.index] == 2 || this.radiogroups[this.index] == 3) {
          this.filter.knows_cloud = 1;
        } else {
          this.filter.knows_cloud = -1;
        }
      }

      if (this.index == 14) {
        if (this.radiogroups[this.index] == 1) {
          this.filter.uses_email = 1;
        } else {
          this.filter.uses_email = -1;
        }
      }

      if (this.index == 17) {
        if (this.checkboxes[this.index][4]) {
          this.filter.wants_up_and_download = 1;
        } else {
          this.filter.wants_up_and_download = -1;
        }
      }

      if (this.index == 20) {
        if (this.radiogroups[this.index] == 1) {
          this.filter.wants_share = 1;
        } else {
          this.filter.wants_share = -1;
        }
      }

      if (this.index == 27) {
        this.filter.has_documents = -1;

        if (this.checkboxes[this.index][0]) {
          this.filter.has_documents_perso = 1;
          this.filter.has_documents = 1;
        } else {
          this.filter.has_documents_perso = -1;
        }
        if (this.checkboxes[this.index][1]) {
          this.filter.has_documents_health_insurance_card = 1;
          this.filter.has_documents = 1;
        } else {
          this.filter.has_documents_health_insurance_card = -1;
        }
        if (this.checkboxes[this.index][2]) {
          this.filter.has_documents_passport = 1;
          this.filter.has_documents = 1;
        } else {
          this.filter.has_documents_passport = -1;
        }
        if (this.checkboxes[this.index][3]) {
          this.filter.has_documents_birth_certificate = 1;
          this.filter.has_documents = 1;
        } else {
          this.filter.has_documents_birth_certificate = -1;
        }
      }

      if (this.index == 34) {
        if (this.radiogroups[this.index] == 1 || this.radiogroups[this.index] == 2) {
          this.filter.is_homeless = 1;
        } else {
          this.filter.is_homeless = -1;
        }
      }

      if (temp) {
        // something was inserted
        // GO TO NEXT QUESTION
        // FILTER LOGIC (which question comes next?)
        // depending on questionid.... and filter which can be checked via standart logic (&& and  || or )

        this.saveanswer(this.index, skipnetwork, () => {
          if (this.index == 0) {
            this.goto(1);
          } else if (this.index == 1) {
            this.goto(2);
          } else if (this.index == 2 && this.filter.has_mobile_internet > 0 && this.filter.has_smartphone > 0) {
            this.goto(3);
          } else if (this.index == 2 && this.filter.has_mobile_internet < 0) {
            this.goto(4);
          } else if (this.index == 3) {
            this.goto(4);
          } else if (this.index == 2 && this.filter.has_smartphone < 0) {
            this.goto(4);
          } else if (this.index == 4) {
            this.goto(5);
          } else if (this.index == 5) {
            this.goto(6);
          } else if (this.index == 6 && this.filter.visits_social_institution > 0) {
            this.goto(7);
          } else if (this.index == 7 && this.filter.visits_social_institution > 0 && this.filter.insitution_has_wifi < 0) {
            this.goto(9);
          } else if (this.index == 7 && this.filter.visits_social_institution > 0 && this.filter.insitution_has_wifi > 0) {
            this.goto(8);
          } else if (this.index == 8) {
            this.goto(9);
          } else if (this.index == 6 && this.filter.visits_social_institution < 0) {
            this.goto(9);
          } else if (this.index == 9 && this.filter.uses_internet > 0) {
            this.goto(10);
          } else if (this.index == 9 && this.filter.uses_internet < 0) {
            this.goto(12);
          } else if (this.index == 10 && this.filter.knows_cloud < 0) {
            this.goto(12);
          } else if (this.index == 10 && this.filter.knows_cloud > 0) {
            this.goto(11);
          } else if (this.index == 11) {
            this.goto(12);
          } else if (this.index == 10 && this.filter.knows_cloud < 0) {
            this.goto(12);
          } else if (this.index == 12) {
            this.goto(13);
          } else if (this.index == 13 && this.filter.uses_internet > 0) {
            this.goto(14);
          } else if (this.index == 13 && this.filter.uses_internet < 0) {
            this.goto(16);
          } else if (this.index == 14 && this.filter.uses_email > 0) {
            this.goto(15);
          } else if (this.index == 15) {
            this.goto(16);
          } else if (this.index == 14 && this.filter.uses_email < 0) {
            this.goto(16);
          } else if (this.index == 16) {
            this.goto(17);
          } else if (this.index == 17 && this.filter.wants_up_and_download > 0) {
            this.goto(18);
          } else if (this.index == 17 && this.filter.wants_up_and_download < 0) {
            this.goto(19);
          } else if (this.index == 19) {
            this.goto(22);
          } else if (this.index == 18) {
            this.goto(20);
          } else if (this.index == 20 && this.filter.wants_share > 0) {
            this.goto(21);
          } else if (this.index == 20 && this.filter.wants_share < 0) {
            this.goto(22);
          } else if (this.index == 21) {
            this.goto(22);
          } else if (this.index == 22) {
            this.goto(23);
          } else if (this.index == 23) {
            this.goto(24);
          } else if (this.index == 24) {
            this.goto(25);
          } else if (this.index == 25) {
            this.goto(26);
          } else if (this.index == 26) {
            this.goto(27);
          } else if (this.index == 27 && this.filter.has_documents > 0) {
            this.goto(28);
          } else if (this.index == 27 && this.filter.has_documents < 0) {
            this.goto(30);
          } else if (this.index == 28) {
            this.goto(29);
          } else if (this.index == 29) {
            this.goto(30);
          } else if (this.index == 30) {
            this.goto(31);
          } else if (this.index == 31) {
            this.goto(32);
          } else if (this.index == 32) {
            this.goto(33);
          } else if (this.index == 33) {
            this.goto(34);
          } else if (this.index == 34) {
            this.goto(35);
          } else if (this.index == 35) {
            this.goto(36);
          } else if (this.index == 36) {
            this.goto(37);
          } else if (this.index == 37) {
            this.goto(38);
          } else if (this.index == 38) {
            this.goto(39);
          } else {
            console.log("this should never happen..... happend on " + this.index);
          }
        });
      } else {
        // nothing was selected, trigger dialog windows of force forward
        this.forwarddialog = true;
      }
    },

    // go to next question
    goto(index) {
      this.stack_index.push(this.index);
      this.index = Math.min(this.questionamount, index);
      this.progress = Math.round((this.index / this.questionamount) * 100);
    },

    // go to last question (in stack)
    backward() {
      this.index = this.stack_index.pop();
      this.progress = Math.round((this.index / this.questionamount) * 100);
    },
  },
};
</script>
<style scoped>
.global {
  overflow: hidden !important;
}

.p-ru-gr {
  font-size: 1.2rem !important;
}
.ml {
  width: 50%;
  margin-left: 25%;
}
.ml-mobile {
  display: none;
}

#start-screen {
  width: 100vw;
  height: 100vh;
  padding: 3% 5% 5% 5%;
  margin: 0;
  background: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.intro-text {
  width: 90%;
  height: 80vh;
  margin: 2vh 5% 2vh 5%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
  overflow: hidden;
}

#start-screen-logo {
  width: 50%;
  padding-top: 10%;
  padding-bottom: 10%;
}

#start-screen h3 {
  font-size: 18px;
  color: #000;
}

#start-screen-animation {
  width: 80%;
  margin-left: 10%;
  padding: 10%;
  padding-top: 5%;
  height: auto;
  display: flex;
  align-content: left;
}

.start-screen-text {
  font-size: 18px;
  text-align: left;
  overflow-y: auto;
  scrollbar-width: thin;
  height: 60vh;
  padding: 5%;
}

.start-screen-text p {
  margin-top: 20px;
}

.start-screen-right {
  background: #006ab3;
  color: #fff !important;
}
.start-screen-mobile-header {
  display: none;
  background: #fff;
}

.start-screen-desktop-header {
  display: inline;
  font-size: 36px;
  color: #fff;
  padding-left: 0px;
  padding-right: 0px;
}

.start-screen-left {
  height: auto;
  overflow: hidden;
}

.start-screen-checks {
  position: sticky;
  bottom: 0px;
  padding: 5%;
  padding-top: 5px;
  padding-bottom: 30px;
  background: #006ab3;
  -webkit-box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.7);
  height: 21vh;
}

#start-screen-checkbox {
  justify-content: center;
  color: #fff !important;
  margin-top: 10px;
}

#start-screen-checkbox2 {
  justify-content: center;
  color: #fff !important;
  margin-top: -20px;
  margin-bottom: -15px;
}

#start-screen-checkbox-text {
  color: #fff !important;
  margin-left: 5px;
  font-size: 14px;
}

#start-screen-checkbox-text-ru-gr {
  font-size: 12px !important;
  color: #fff !important;
  margin-left: 5px;
}

#start-screen-checkbox-text a {
  color: #99b533 !important;
}

#start-screen-startbutton {
  color: #fff;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  z-index: 10;
}

#progress-bar {
  width: calc(100vw - 110px);
  border-radius: 50px;
  color: #000;
  position: fixed;
  bottom: 50px;
  left: 55px;
  pointer-events: none;
}

#umfrage-screen {
  width: 100vw;
  height: 100vh;
  padding: 3%;
  margin: 0;
  margin: 0;
  background: url("../assets/bg-header-blurred.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
}

.options {
  width: 90%;
  margin-left: 3%;
  padding: 2%;
  height: 50vh;
  overflow: auto;
  scrollbar-width: thin;
  display: flex;
  align-items: top !important;
  align-content: left !important;
  justify-content: left !important;
}

.radio-group {
  width: 90%;
  height: 50vh;
  margin-left: 3%;
  padding: 2%;
  overflow: auto;
  scrollbar-width: thin;
}

.options .languages {
  padding-left: 0px !important;
}

.checkbox {
  text-align: left;
  align-content: center;
  justify-content: first baseline;
  margin-bottom: 0px !important;
  height: auto;
}

.checkbox /deep/ label {
  font-size: 20px !important;
  line-height: 1.3;
  padding: 5px;
}

.checkbox-ru-gr /deep/ label {
  font-size: 23px !important;
  line-height: 1.3;
  padding: 5px;
}

.radio {
  text-align: left;
  align-content: center;
  margin-bottom: 20px !important;
  height: auto;
}

.radio /deep/ label {
  font-size: 20px !important;
  line-height: 1.3;
  padding: 5px;
}

.radio-ru-gr /deep/ label {
  font-size: 23px !important;
  line-height: 1.3;
  padding: 5px;
}

.textinput {
  width: 80%;
  font-size: 20px;
  color: #00558d !important;
}

.textinput.in-radio {
  max-width: 50% !important;
  height: 45px;
  margin-top: 0px;
  margin-left: 15px;
}

.textinput.in-radio /deep/ label {
  font-size: 12px !important;
}

.textinput.under-radio {
  max-width: 100% !important;
  height: 45px;
  margin-top: 0px;
  margin-left: 15px;
}

.textinput.under-radio /deep/ label {
  font-size: 12px !important;
}

.codearea {
  margin-left: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.modal-helper-text {
  margin-top: 10px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #afafaf;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: #006ab3;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00558d;
}

.impressum {
  color: #fff !important;
  text-decoration: none;
  position: fixed;
  bottom: 5px;
  right: 5px;
}

.dsgvo {
  color: #fff;
}

.col-12 {
  padding: 0 !important;
}

.text_tut {
  font-size: 18px;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 10px;
  margin-top: 20px;
  display: block;
  overflow: auto;
  scrollbar-width: thin;
  text-align: left;
}

/* -------- TABLET RESPONSIVE -------- */

@media screen and (max-width: 1100px) {
  #start-screen {
    padding: 0;
    background: #006ab3;
    border-radius: 0;
  }

  .ml-mobile {
    display: inline;
  }

  .intro-text {
    border-radius: 0;
    width: 100vw;
    margin: 0;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .start-screen-right {
    height: 100vh;
  }

  .start-screen-left {
    display: none;
  }

  #umfrage-screen {
    padding: 5%;
  }

  .text_tut {
    padding: 5%;
    font-size: 16px !important;
    margin-left: 0;
    margin-right: 0;
    text-align: left;
  }

  .incard-tut-text {
    font-size: 18px;
    padding-bottom: 20px !important;
    text-align: left;
  }

  .options {
    width: 90%;
    height: 50vh;
    margin: 5%;
    margin-top: 0;
    padding-bottom: 5%;
    font-size: 12px;
    overflow: auto;
    scrollbar-width: thin;
    display: flex;
    align-items: top;
    align-content: center;
    justify-content: center;
  }

  .p-ru-gr {
    font-size: 1.18rem !important;
  }
}

/* -------- SMARTPHONE RESPONSIVE -------- */

@media screen and (max-width: 700px) {
  #progress-bar {
    bottom: 15px;
  }

  #start-screen p {
    margin: 0px 2% 0px 2%;
  }

  #start-screen-animation {
    padding-top: 5%;
    padding-bottom: 5%;
  }

  #start-screen h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-size: 26px;
    color: #006ab3;
    padding-left: 30px;
    padding-right: 30px;
  }

  #start-screen h3 {
    font-size: 16px;
    color: #000;
  }

  #start-screen {
    background: #fff;
    height: 70vh;
  }

  .start-screen-text {
    background: #006ab3;
    padding-bottom: 40vh;
    height: auto;
    overflow: visible;
  }

  .start-screen-checks {
    position: fixed;
    height: 30vh;
    width: 100vw;
    padding: 5%;
    padding-bottom: 30px;
    padding-top: 10px;
  }

  .start-screen-mobile-header {
    display: inline;
    background: #fff;
    height: auto;
  }

  .start-screen-desktop-header {
    display: none;
  }

  .ml-mobile {
    display: inline;
  }

  .start-screen-right {
    height: 70vh;
    padding-bottom: 20vh;
    background: #fff;
  }

  .options {
    width: 90%;
    height: 50vh;
    margin: 1%;
    margin-top: 0;
    margin-left: 5%;
    padding: 15px;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .radio-group {
    width: 90%;
    height: 50vh;
    margin: 1%;
    margin-top: 0;
    margin-left: 5%;
    padding: 15px;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .options .languages {
    padding-left: 30px !important;
  }

  .radio /deep/ label {
    font-size: 15px !important;
    line-height: 1.3;
  }

  .radio-ru-gr /deep/ label {
    font-size: 18px !important;
    line-height: 1.3;
  }

  .checkbox /deep/ label {
    font-size: 15px !important;
  }

  .checkbox-ru-gr /deep/ label {
    font-size: 18px !important;
  }

  .textinput {
    width: 100%;
    font-size: 14px;
    color: #006ab3 !important;
  }

  .text_tut {
    padding: 5% 10%;
    font-size: 14px !important;
    text-align: left;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .incard-text-tut {
    font-size: 14px;
    margin-bottom: 20px;
    text-align: left;
  }

  .impressum {
    position: fixed;
    bottom: 50px;
    right: 0px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .p-ru-gr {
    font-size: 0.89rem !important;
  }

  .v-input--selection-controls {
    margin-top: 0px !important;
  }
}
</style>
