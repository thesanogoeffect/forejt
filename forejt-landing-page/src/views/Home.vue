  <template>
  <v-container class="text-center py-2">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1 class="display-1 forejt-title">FC Forejt kalendář</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <img src="@/assets/forejtlogo.jpg" class="forejt-logo" alt="FC FOREJT" />
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="mx-auto mb-5 card-container">
          <br />
          <div class="card-content text-center">Přidejte si zápasy Forejtu do vaší<br> oblíbené kalendářové aplikace:</div>
          <br />
          <v-card-text class="button-row">
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
                <div>.ics</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="text-center">
    <i>Kalendář se sám aktualizuje každých 24 hodin.</i> <br />
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

<style scoped>
.card-container {
  padding: 15px;
  background-color:hwb(0 31% 67%);
  color: white;
}



.button-row {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.icon-img {
  width: 40px;
  height: 40px;
}
.card-content {
  font-size: 1.5rem;  /* Adjust this value based on your needs */
  margin-bottom: 20px;  /* Keeping some spacing at the bottom */
}
.forejt-title {
  font-size: 2.8rem;  /* Adjust this value based on your needs */
  margin-bottom: 3px;  /* Keeping some spacing at the bottom */
}
.forejt-logo {
  width: 160px;
  height: auto; /* Keeps the aspect ratio */
}
</style>