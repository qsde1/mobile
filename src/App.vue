<template>
  <ion-app>
      <ion-router-outlet/>
  </ion-app>
</template>

<script>
import { 
  IonApp,
  IonRouterOutlet,
} from '@ionic/vue';

import store from "./storage/storage";


export default {
  components: {
    IonApp,
    IonRouterOutlet,
  },
  store, 
}
</script>
