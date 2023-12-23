<template>
    <ion-page class="container">
      <ion-tabs>    
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="schedule" href="/main/schedule" @click="active('schedule')" :class="{active: scheduleIsActive}">
            <ion-icon :icon="$options.icons.calendarOutline"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="exercises" href="/main/exercises" @click="active('exercises')" :class="{active: exercisesIsActive}">
            <ion-icon :icon="$options.icons.eyeOutline" />
          </ion-tab-button>
  
          <ion-tab-button tab="library" href="/main/statistics" @click="active('library')" :class="{active: libraryIsActive}">
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
  
  import store from '../storage/storage'

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

    store,

    data(){
      return {
        libraryIsActive: false,
        exercisesIsActive: true,
        scheduleIsActive: false,
      }
    },

    methods:{
      active(page){
        switch (page) {
          case 'library':
            this.libraryIsActive = true;
            this.exercisesIsActive = false;
            this.scheduleIsActive = false;
            break;
          case 'exercises':
            this.libraryIsActive = false;
            this.exercisesIsActive = true;
            this.scheduleIsActive = false;
            break;
          case 'schedule':
            this.libraryIsActive = false;
            this.exercisesIsActive = false;
            this.scheduleIsActive = true;
            break;
        
          default:
            break;
        }
      }
    },

    //удаление просроченных сетов
    created(){
      // setInterval(async () =>{
        // this.$options.store.deleteOldSetFromShadule();
        // console.log('delete');
      // }, 5000);
    }
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

  .active{
    color: #ffffff;
  }

  ion-tab-button{
    color: #ffffff59;
    /* --color-selected: rgba(255, 255, 255, 0.486); */
  }  
  
</style>