<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title> Custom iCal Variants </v-card-title>
              <v-card-actions>
                <a :href="appleLink">
                  <v-btn color="primary">Apple</v-btn>
                </a>
                <a :href="outlookLink">
                  <v-btn color="primary">Outlook</v-btn>
                </a>
                <a :href="icsLink">
                  <v-btn color="primary">Ics</v-btn>
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
