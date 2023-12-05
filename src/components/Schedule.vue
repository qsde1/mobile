<template>
  <ion-page :class="{'ion-justify-content-start': state == 'calendar', 'ion-justify-content-center': state == 'clock'}">
    <div class="calendar ion-align-self-center" v-if="state == 'calendar'">
      <p class="current-date">
        <span>
          <ion-icon class="top-icon" :icon="$options.icons.chevronBackOutline" @click="nextMonth()"></ion-icon>
        </span>
        <span class="current-month">
          {{ month }}
        </span>
        <span>
          <ion-icon class="top-icon" :icon="$options.icons.chevronForwardOutline" @click="prevMonth()"></ion-icon>
        </span>
      </p>
      <ion-grid>
        <ion-row>
          <ion-col v-for="dayName in $options.weekDaysName">
            {{ dayName }}
          </ion-col>
        </ion-row>
        <ion-row v-for="(week,weekIndex) in calendar">
          <template v-if="weekIndex == 0 && week.length < 7">
            <ion-col v-for="i in 7 - week.length"></ion-col>                
          </template>
          <ion-col class="no-empty" v-for="day in week" :class="{'day-have-set': dayIsContainsInShedule(day)}" @click="createTimeForSet(+day)">
            <span>{{ day }}</span>
          </ion-col>
          <template v-if="weekIndex == calendar.length-1 && week.length < 7">
            <ion-col v-for="i in 7 - week.length"></ion-col>
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
            <p>:</p>
          </div>
          <div class="clock-item">
            <ion-icon class="bottom-icon" :icon="$options.icons.chevronUpOutline" @click="incrementMinutes()"></ion-icon>
            <p class="minutes">{{ currentMinutes }}</p>
            <ion-icon class="bottom-icon" :icon="$options.icons.chevronDownOutline" @click="decrementMinutes()"></ion-icon>
          </div>
        </div>
        <div class="add-button">
          <span @click="addSetInShedule()">
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

    months:{
      0: 'январь',
      1: 'февраль',
      2: 'март',
      3: 'апрель',
      4: 'май',
      5: 'июнь',
      6: 'июль',
      7: 'август',
      8: 'сентябрь',
      9: 'октябрь',
      10: 'ноябрь',
      11: 'декабрь',
    },

    weekDaysName:{
      1: 'пн',
      2: 'вт',
      3: 'ср',
      4: 'чт',
      5: 'пт',
      6: 'сб',
      7: 'вс',
    },

    icons: {
      chevronUpOutline,
      chevronDownOutline,
      chevronBackOutline,
      chevronForwardOutline,
    },

    data(){
      return {
        selectedDate: new Date(),
        state: 'calendar',
        hourse: 0,
        minutes: 0,
        shedule: null,
      }
    },

    computed:{
      currentHourse(){
        return this.hourse.toString().length < 2 ? '0' + this.hourse : this.hourse;
      },
      
      currentMinutes(){
        return this.minutes.toString().length < 2 ? '0' + this.minutes : this.minutes;
      },

      month(){        
        let month = this.selectedDate.getMonth();
        return this.$options.months[month];
      },

      calendar(){
        let date = this.selectedDate;
        let dayCountInCurrentMonth = this.getDayCountInMonth(date.getTime());
        let month = [];
        let week = [];
        for (let i = 1; i <= dayCountInCurrentMonth; i++) {
          date.setDate(i);
          week.push(date.getDate());
          let dayIndexInWeek = date.getDay();
          if(dayIndexInWeek == 0 || i == dayCountInCurrentMonth) {
            month.push(week);
            week = [];
          }
        }
        return month;
      }
    },

    watch:{
      shedule(o,n){
        console.log('watch:' + n);
      },

      selectedDate(o,n){
        console.log("watch: " + n);
      }
    },

    methods:{
      dayIsContainsInShedule(day){
        let startDay = new Date(this.selectedDate);
        startDay.setDate(day);
        startDay.setHours(0);
        startDay.setMinutes(0);
        startDay.setSeconds(0);
        
        let endDay = new Date(this.selectedDate);
        endDay.setDate(day);
        endDay.setHours(23);
        endDay.setMinutes(59);
        endDay.setSeconds(59);

        if(!this.shedule)
          return null;

        let findedDay = this.shedule.find(t=>{
          return t >= startDay.getTime() || t <= endDay.getTime();
        })

        return findedDay == true;
      },

      nextMonth(){
        let newDate = new Date(this.selectedDate.getTime());
        newDate.setDate(1);
        let month = newDate.getMonth();        
        newDate.setMonth(--month);
        this.selectedDate = new Date(newDate.getTime())
      },

      prevMonth(){
        let newDate = new Date(this.selectedDate.getTime());
        newDate.setDate(1);
        let month = newDate.getMonth();        
        newDate.setMonth(++month);
        this.selectedDate = new Date(newDate.getTime())
        
      },

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

      getDayCountInMonth(timestamp){
        let date = new Date(timestamp);
        let currentMonth = date.getMonth();
        let dayCountInCurrentMonth = 28;
        while (true) {     
          date.setDate(dayCountInCurrentMonth);
          if(date.getMonth() != currentMonth){
            dayCountInCurrentMonth--;
            break;
          }
          dayCountInCurrentMonth++;
        }

        return dayCountInCurrentMonth;
      },

      addTime(){
        this.state = 'calendar';
      },

      createTimeForSet(day){
        this.state = 'clock';
        this.selectedDate.setDate(day);
        this.hourse = this.selectedDate.getHours();
        this.minutes = this.selectedDate.getMinutes();
      },

      async addSetInShedule(){
        let newDate = new Date(this.selectedDate.getTime());        
        newDate.setHours(this.hourse);
        newDate.setMinutes(this.minutes);

        let timestamp = newDate.getTime();
        await this.$options.store.addSetInShedule(timestamp);
        this.shedule = await this.$options.store.getItem('shedule');

        this.state = 'calendar';
      }
    },

    async created(){
      await this.$options.store.create();
      // await this.$options.store.clear();
    },
    
    async ionViewWillEnter(){
      this.selectedDate = new Date();
      this.selectedDate.setHours(0);
      this.selectedDate.setMinutes(0);
      // this.shedule = await this.$options.store.getItem('shedule');
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

  .day-have-set{
    border-bottom: 1px solid rgb(0, 0, 0);
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
    /* height: 15%; */
    margin-top: 30px;
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
    /* width: 95%;  */
    /* height: 85%; */
    padding: 0 20px;   
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
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