<template>
  <v-app class="main-background">
    <v-main>
      <router-view />
    </v-main>
    <v-footer fixed padless>
    <v-col class="text-center py-2" cols="12">
      made with ❤️ by <a href="https://www.linkedin.com/in/jakubwerner">Jakub Werner</a> <br />using data from
      <a href="https://www.psmf.cz">psmf.cz</a>
      <br />
      <br />
      <br />
      <a href="mailto:jakubwerner1@gmail.com">Contact</a>

     
    </v-col>
  </v-footer>
  </v-app>
</template>

<script setup>
  //
</script>

<style scoped>
  .main-background {
    background-color: hwb(0 100% 0%);
  }
</style>