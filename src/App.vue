<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-btn rounded color="primary" dark @click="navigate(1)">
        Defect Detector
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn rounded color="primary" dark @click="navigate(2)">
        Testing queue
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn rounded color="primary" dark @click="navigate(3)">
        production history
      </v-btn>


    </v-app-bar>

    <v-app>

      <router-view />

    </v-app>
  </div>

</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    navigate(a){
      if(a == 1){
        this.$router.push({ name: 'HomeView' });
      }else if(a == 2){
        this.$router.push({ name: 'TestingView' });
      }else if(a == 3){
        this.$router.push({ name: 'HistoryView' });
      }
      
    }
  },
};
</script>
