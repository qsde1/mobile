<template>
    <ion-page class="container">
      <ion-tabs>    
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="schedule" href="/main/schedule">
            <ion-icon :icon="$options.icons.calendarOutline"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="exercises" href="/main/exercises">
            <ion-icon :icon="$options.icons.eyeOutline" />
          </ion-tab-button>
  
          <ion-tab-button tab="library" href="/main/statistics">
            <ion-icon :icon="$options.icons.podiumOutline" />
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>    
    </ion-page>
  </template>
  
<script>
  import { 
    IonPage,
    IonRouterOutlet,
    IonTabButton,
    IonTabs,
    IonTabBar,
    IonLabel,
    IonIcon,
  } from '@ionic/vue';
  
  import {
    playCircle,
    radio,
    library,
    search,
    calendarOutline,
    playOutline,
    eyeOutline,
    podiumOutline,
  } from 'ionicons/icons';
  
  export default {
    components: {
      IonPage,
      IonRouterOutlet,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonLabel,
      IonIcon,
    },

    icons:{
      playCircle,
      radio,
      library,
      search,
      calendarOutline,
      podiumOutline,
      playOutline,
      eyeOutline,
    },

    data(){
      return {

      }
    },
  }
</script>
  
<style scoped>
  .container{
      width: 100vw;
      height: 100vh;
      font-family: "Roboto";
      background-color: #6e6e6e;
  }
  .content{
      height: 100%;
  }

  ion-tabs {
    /* --background: #6e6e6e; */
    --border-color: #6e6e6e;
  }
  ion-tab-bar {
    --background: #6e6e6e;
    --border: none;    
    --color: rgba(0, 0, 0, 0.404);
  }


  ion-tab-button{
    --color-selected: rgb(0, 0, 0);
  }
  
</style>