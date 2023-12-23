<template>
    <ion-page class="container">
        <template v-if="sheduleStore.shedule && sheduleStore.stat != null">
            <template v-if="state == 'emptyShedule'">
                <p>{{ $options.messageAboutEmptyShedule }}</p>
                <div class="ion-justify-content-start">
                    <ion-button fill="clear" @click="startExercise()">
                        <p>да</p>
                    </ion-button>
                    <ion-button fill="clear" @click="declineExerciseUnshedule()">
                        <p>нет</p>
                    </ion-button>
                </div>
            </template>
            <template v-if="state == 'none'">
                <ion-button fill="clear" @click="checkNearestSetInShedule()">
                    <p>начать</p>
                </ion-button>                
            </template>
            
            <template v-if="state == 'doing'">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <p>{{ progress }}</p>
                            <ion-img
                                :src="exercises[this.currentExercisesIndex].path"
                            ></ion-img>
                            <!-- <p>{{ this.currentExercisesIndex + 1 }}</p> -->
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="time">
                                <div></div>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </template>
    
            <template v-if="state == 'break'">
                <p>Перерыв:</p>
                <p>{{ timeToStartInSeconds }}</p>
            </template>
    
            <template v-if="state == 'done'">
                <p>Сет выполнен</p>
                <ion-button fill="clear" @click="showInfoAboutNextSet()" v-if="completedSetRemoved">
                    <p>ok</p>
                </ion-button>
            </template>
    
            <template v-if="state == 'info'">
                <p>Следующий сет {{nextSetDateInfo}}</p>
            </template>
        </template>
    </ion-page>
</template>
  
<script>
    // import store from '../storage/storage'
    import { handRightSharp } from 'ionicons/icons';
import {useSheduleStore} from '../storage/pinia-shedule'
    import { 
      IonPage,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      IonImg,
    } from '@ionic/vue';
  
    export default {
        messageAboutEmptyShedule:'В расписании нет ближайших занятий, выполнение результата не будет записано в статистику. Выполнить сет вне расписания?',
      components: {
        IonPage,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
      },

      data(){
        return {
            nearestDateFromShedule: null,
            setUnshedules: false,
            sheduleStore: null,
            state: 'none',
            exercises: [
                {id:1,path:'assets/1.gif'},
                {id:2,path:'assets/2.gif'},
                {id:3,path:'assets/3.gif'},
                // {id:4,path:'assets/4.mp4'},
                {id:5,path:'assets/5.gif'},
                {id:6,path:'assets/6.gif'},
                
                // {id:3,path:'../gifs/3.mp4'},
                // {id:4,path:'../gifs/4.mp4'},
                // {id:5,path:'../gifs/5.mp4'},
                // {id:6,path:'../gifs/6.mp4'},
            ],
            currentExercisesIndex: 0,
            breakTime: 5000,
            infoTime: 5000,
            nextSetInfo: null,
            timeToStart: null,
            exercisesTime: 5000,
            currentExercisesTime: 0,
            exercisesTimeIntervalIncrement: 15,

            completedSetRemoved: false,
        }
      },

      computed: {
        currentExerciseGif(){
            return `@/../gifs/${this.currentExercisesIndex + 1}.mp4`;
        },

        progress(){
            return this.exercises[this.currentExercisesIndex].id + '/' + this.exercises.length;
        },
        
        timeWidthCSS(){
            return this.timeWidth + '%';
        },

        timeProgress(){            
            let percent = (this.currentExercisesTime * 100) / this.exercisesTime;
            return `linear-gradient(to right, white ${percent}%, black 0%)`;
        },

        timeToStartInSeconds(){
            return this.timeToStart / 1000;
        },

        nextSetDateInfo(){
            return this.nextSetInfo == 'Сетов в расписании больше нет.' ? this.nextSetInfo : `${new Date(this.nextSetInfo).getDate()}.${new Date(this.nextSetInfo).getMonth()+1}.${new Date(this.nextSetInfo).getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}.`;
        }
      },

      methods:{
        declineExerciseUnshedule(){
            this.state = 'none';
            this.setUnshedules = false;
        },
        checkNearestSetInShedule(){
            let currentDate = new Date().getTime();
            let thirtyMinutes = 1_800_000;
            let nearestDateInShedule = this.sheduleStore.shedule.find(s=>{
                return s > (currentDate - thirtyMinutes) && s < (currentDate + thirtyMinutes);
            });
            if(nearestDateInShedule){
                this.nearestDateFromShedule = nearestDateInShedule;
                this.startExercise();
            }
            else {
                this.setUnshedules = true;
                this.state = 'emptyShedule';
            }
        },

        startExercise(){
            console.log('start');
            this.state = 'doing';
            let interval = setInterval(()=>{
                this.currentExercisesTime = this.currentExercisesTime + this.exercisesTimeIntervalIncrement;
                if(this.currentExercisesTime > this.exercisesTime){
                    this.switchExercise();
                    this.currentExercisesTime = 0;
                    clearInterval(interval);
                }
            },this.exercisesTimeIntervalIncrement);
        },

        switchExercise(){
            console.log('switch');
            if(this.currentExercisesIndex == this.exercises.length - 1){
                this.stopExercises();
            }
            else {
                this.currentExercisesIndex++;
                this.startBreak();
            }
        },

        startBreak(){
            this.state = 'break';
            console.log(this.timeToStart);
            let interval = setInterval(() => {
                this.timeToStart = this.timeToStart - 1000;
                if(this.timeToStart < 1){
                    this.timeToStart = this.breakTime;
                    clearInterval(interval);
                    this.startExercise();
                }
            }, 1000);
        },

        async stopExercises(){
            this.state = 'done'
            this.currentExercisesIndex = 0;
            // let currentDate = new Date().getTime();
            // let thirtyMinuts = 1_800_000;
            // let nearestDate = this.sheduleStore.shedule.find(s=>{
            //     return s > (currentDate - thirtyMinuts) && s < (currentDate + thirtyMinuts);
            // })
            if(this.setUnshedules){
                console.log('задания вне расписания');
                this.setUnshedules = false;
                this.completedSetRemoved = true;
            } else {
                this.sheduleStore.addSetInStat(this.nearestDateFromShedule,'done')
                    .then(async ()=>{
                       await this.sheduleStore.removeSetFromShedule(this.nearestDateFromShedule);
                       this.completedSetRemoved = true;
                       this.nearestDateFromShedule = null;
                    })
            }
        },

        async showInfoAboutNextSet(){
            this.state = 'info';
            this.nextSetInfo = this.sheduleStore.shedule.length > 0 ? this.sheduleStore.shedule[0] : 'Сетов в расписании больше нет.';
            setTimeout(()=>{
                this.nextSetInfo = null;
                this.state = 'none';
            },this.infoTime);
        },
      },

      created(){
            this.sheduleStore = useSheduleStore();
            this.sheduleStore.getShedule();
            this.sheduleStore.getStat();
            this.timeToStart = this.breakTime;
      },

      async ionViewWillEnter(){
        if(this.state == 'emptyShedule'){
            this.state == 'none';
        }
          this.sheduleStore.getShedule();
          this.sheduleStore.getStat();

        // await this.$options.store.create();
        // await this.getItems();
        // console.log(this.$refs.time.style);
      },
    }
</script>

<style scoped>
    ion-page{
        color: white;
    }
    .container{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p{
        color: white;
        font-size: 30px;
        text-align: center;
    }
    ion-button > p{        
        border-bottom: 1px solid white;
        margin: 0 2px;
    }
    .time{
        margin: 0 auto;
        min-height: 50%;
        width: 80%;
        /* margin-bottom: 20px; */
        /* border-bottom: 1px solid ; */
        display: flex;
        align-items: end;
    }
    .time>div{
        height: 1px;
        width: 100%;
        background: v-bind(timeProgress);
    }
    ion-grid{
        min-width: 100%;
    }
    
    ion-row{
        min-height: 100%;        
    }
</style>
  