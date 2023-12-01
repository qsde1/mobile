<template>
  <ion-page class="ion-justify-content-center">
    <div class="calendar ion-align-self-center" v-if="state == 'calendar'">
      <p class="current-date">
        <span>
          <ion-icon class="top-icon" :icon="$options.icons.chevronBackOutline" @click="incrementHourse()"></ion-icon>
        </span>
        <span class="current-month">
          ноябрь
        </span>
        <span>
          <ion-icon class="top-icon" :icon="$options.icons.chevronForwardOutline" @click="incrementHourse()"></ion-icon>
        </span>
      </p>
      <ion-grid>
        <ion-row v-for="(week,weekIndex) in month">
          <template v-if="weekIndex == 0 && week.length < 7">
            <ion-col v-for="i in week.length + 1"></ion-col>                
          </template>
          <ion-col class="no-empty" v-for="day in week" @click="state = 'clock'">
            <span>{{ day }}</span>
          </ion-col>
          <template v-if="weekIndex == month.length-1 && week.length < 7">
            <ion-col v-for="i in week.length + 1"></ion-col>
          </template>
        </ion-row>
      </ion-grid>
    </div>



    <div v-if="state == 'clock'" class="content">
      <div class="clock">
        <div class="clock-container ion-justify-content-center">
          <div class="clock-item">
            <ion-icon class="top-icon" :icon="$options.icons.chevronUpOutline" @click="incrementHourse()"></ion-icon>
            <p class="hourse">{{ currentHourse }}</p>
            <ion-icon class="top-icon" :icon="$options.icons.chevronDownOutline" @click="decrementHourse()"></ion-icon>
          </div>
          <div class="clock-item">
            <!-- <ion-icon class="top-icon" :icon="$options.icons.chevronUpOutline" @click="hourse++"></ion-icon> -->
            <p>:</p>
            <!-- <ion-icon class="top-icon" :icon="$options.icons.chevronDownOutline" @click="minutes--"></ion-icon> -->
          </div>
          <div class="clock-item">
            <ion-icon class="bottom-icon" :icon="$options.icons.chevronUpOutline" @click="incrementMinutes()"></ion-icon>
            <p class="minutes">{{ currentMinutes }}</p>
            <ion-icon class="bottom-icon" :icon="$options.icons.chevronDownOutline" @click="decrementMinutes()"></ion-icon>
          </div>
        </div>
        <div class="add-button">
          <span @click="addTime()">
            добавить
          </span>
        </div>
      </div>
      <div>

      </div>
    </div>
  </ion-page>
</template>
  
<script>
  import store from '../storage/storage'
  import { 
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
    IonItemGroup,
    IonIcon,
  } from '@ionic/vue';
  
  import {
    chevronUpOutline,
    chevronDownOutline,
    chevronBackOutline,
    chevronForwardOutline,
  } from 'ionicons/icons';


  export default {
    components: {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonButton,
      IonItem,
      IonLabel,
      IonText,
      IonItemGroup,
      IonIcon,
    },
    store,

    icons: {
      chevronUpOutline,
      chevronDownOutline,
      chevronBackOutline,
      chevronForwardOutline,
    },

    data(){
      return {
        month: [
          [1,2,3],
          [8,9,10,11,12,13,14],
          [15,16,17,18,19,20,21],
          [22,23,24,25,26,27,28],
          [29,30,31]
        ],
        // month: null,
        datePeek: null,        
        state: 'clock',
        hourse: 0,
        minutes: 0,        
      }
    },

    computed:{
      currentHourse(){
        return this.hourse.toString().length < 2 ? '0' + this.hourse : this.hourse;
      },
      
      currentMinutes(){
        return this.minutes.toString().length < 2 ? '0' + this.minutes : this.minutes;
      }
    },

    methods:{
      incrementHourse(){
        this.hourse = this.hourse < 23 ? this.hourse + 1 : 0
      },
      
      incrementMinutes(){
        this.minutes = this.minutes < 59 ? this.minutes + 1 : 0
      },
      
      decrementHourse(){
        this.hourse = this.hourse > 0 ? this.hourse - 1 : 23
      },
      
      decrementMinutes(){
        this.minutes = this.minutes > 0 ? this.minutes - 1 : 59
      },

      addTime(){
        this.state = 'calendar';
      }
    },

    async created(){
      await this.$options.store.create();
    },

    async ionViewWillEnter(){

    }
  }
</script>

<style scoped>
  ion-grid{
    max-width: 700px !important;
    min-width: 250px !important;
  }

  ion-col{
    margin: 25px 8px;
    padding: 5px 0;
  }

  .no-empty{
    text-align: center;
    border-bottom: 1px solid white;
  }
  
  ion-content{
    --background: #6e6e6e;
  }  

  span{
    margin: 0;
    color: white;
    /* border-bottom: 1px solid white; */
  }

  ion-item{
    --background: none;
    --border-color: #6e6e6e00;    
  }

  ion-text{
    margin: 0 5px;
  }

  ion-item-group{
    margin: 0 auto;
  }

  .current-date{
    display: flex;
    justify-content: center;
  }
  p>span{
    display: flex;  
    align-items: center;
    margin: 0 5px;    
  }
  .current-month{
    font-size: 25px
  }

  .calendar{    
    width: 95%; 
    padding: 0 20px;   
    text-align: center;
    font-size: 25px;
  }

  .inner-grid{
    margin: 0 auto;
    max-width: 80px;
  }
  .content{
    width: 100%;
    /* min-height: 15px; */
  }

  .clock{
    font-size: 25px
  }

  .clock-item {
    margin: auto 5px;
  }

  .clock-item p{
    margin: 10px 0;
    text-align: center;
  }

  .clock-container {
    display: flex;
    /* border: 1px solid black; */
  }

  .add-button{
    text-align: center;
    margin-top: 40px;    
  }

  .add-button span{
    border-bottom: 1px solid white;
    padding: 5px 4px;
  }


</style>  