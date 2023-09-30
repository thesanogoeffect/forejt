<template>
  <v-container class="text-center py-2">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1 class="display-1">Forejt calendar</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <img src="@/assets/forejtlogo.jpg" alt="FC FOREJT" />
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="mx-auto mb-5">
          <v-row class="justify-center">
            <v-col cols="auto" class="text-center">
              <a :href="googleLink">
                <v-btn color="primary" icon>
                  <img
                    src="@/assets/Google_Calendar_icon_(2020).svg"
                    alt="Google Calendar"
                    width="40"
                    height="40"
                  />
                </v-btn>
              </a>
              <div>Google</div>
            </v-col>
            <v-col cols="auto" class="text-center">
              <a :href="appleLink">
                <v-btn color="primary" icon>
                  <img
                    src="@/assets/Apple_Calendar_(iOS).svg"
                    alt="Apple Calendar"
                    width="40"
                    height="40"
                  />
                </v-btn>
              </a>
              <div>Apple</div>
            </v-col>

            <v-col cols="auto" class="text-center">
              <a :href="outlookLink">
                <v-btn color="primary" icon>
                  <img
                    src="@/assets/Microsoft_Office_Outlook_(2018–present).svg"
                    alt="Outlook"
                    width="40"
                    height="40"
                  />
                </v-btn>
              </a>
              <div>Outlook</div>
            </v-col>

            <v-col cols="auto" class="text-center">
              <a :href="icsLink">
                <v-btn color="primary" icon>
                  <v-icon medium>mdi-calendar</v-icon>
                </v-btn>
              </a>
              <div>Ics</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    appleLink() {
      return `webcal://thesanogoeffect.github.io/forejt/forejt.ics`;
    },
    outlookLink() {
      return `webcal://thesanogoeffect.github.io/forejt/forejt.ics`;
    },
    icsLink() {
      return `https://thesanogoeffect.github.io/forejt/forejt.ics`;
    },
    googleLink() {
      const webcal_url = `webcal://thesanogoeffect.github.io/forejt/forejt.ics`;
      return `https://www.google.com/calendar/render?cid=${webcal_url}`;
    },
  },
};
</script>

<style>
.neumorphic {
  background: #f0f0f0;
  box-shadow: 10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff;
}
</style>
