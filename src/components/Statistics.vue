<template>
    <ion-page class="ion-justify-content-center">
      <div class="ion-align-self-center">
        <ion-grid>
          <ion-row>
            <ion-col>поломалось :(</ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-page>
  </template>
  
  <script>
  import { 
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
  } from '@ionic/vue';
  
  
  export default {
    components: {
      IonPage,
      IonGrid,
      IonRow,
      IonCol,
    }
  }
  </script>

<style scoped>
  ion-col{
    color: white;
    font-size: 25px;
  }
</style>
  