<template>
  <v-app>
    <v-main>
      <v-container class="text-center py-5"> 
        <h1 class="display-1">Forejt</h1>
      </v-container>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-card class="mx-auto mb-5">
              <v-card-title class="text-center">
                <span class="headline">Custom iCal Variants</span>
              </v-card-title>
              <v-card-actions class="justify-center">
                <a :href="appleLink">
                  <v-btn color="primary">Apple</v-btn>
                </a>
                <a :href="outlookLink">
                  <v-btn color="primary">Outlook</v-btn>
                </a>
                <a :href="icsLink">
                  <v-btn color="primary">.ics</v-btn>
                </a>
                <a :href="googleLink">
                  <v-btn color="primary">Google</v-btn>
                </a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer fixed padless>
      <v-col class="text-center py-2" cols="12">
        made with ❤️, by Jakub Werner
      </v-col>
    </v-footer>
  </v-app>
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
