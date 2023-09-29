<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title> Custom iCal Variants </v-card-title>
              <v-card-actions>
                <v-btn color="primary" @click="openLink('apple')">Apple</v-btn>
                <v-btn color="primary" @click="openLink('outlook')"
                  >Outlook</v-btn
                >
                <v-btn color="primary" @click="openLink('ics')">Ics</v-btn>
                <v-btn color="primary" @click="openLink('google')"
                  >Google</v-btn
                >
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
  methods: {
    openLink(variant) {
      const url = `https://thesanogoeffect.github.io/forejt/forejt.ics`;
      const webcal_url = `webcal://thesanogoeffect.github.io/forejt/forejt.ics`;
      const google_cal_url = `https://www.google.com/calendar/render?cid=${webcal_url}`;
      
      if (variant === "apple") {
        window.open(webcal_url);
      } else if (variant === "outlook") {
        window.open(webcal_url);
      } else if (variant === "ics") {
        window.open(url);
      } else if (variant === "google") {
        window.open(google_cal_url);
      }
      
    },
  },
};
</script>
