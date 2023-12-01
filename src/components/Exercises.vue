<template>
    <ion-page class="container">
        <template v-if="state == 'none'">
            <ion-button fill="clear" @click="startExercise()">
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
                        <p>(видео с упражнением)</p>
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
            <ion-button fill="clear" @click="showInfoAboutNextSet()">
                <p>ok</p>
            </ion-button>
        </template>

        <template v-if="state == 'info'">
            <p>Следующий сет 25.11.2023</p>
        </template>
    </ion-page>
</template>
  
<script>
    import store from '../storage/storage'
    import { 
      IonPage,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
    } from '@ionic/vue';
  
    export default {
      components: {
        IonPage,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
      },
      store,

      data(){
        return {
            state: 'none',
            exercises: [
                {id:1},
                {id:2},
                {id:3},
            ],
            currentExercisesIndex: 0,
            breakTime: 5000,
            infoTime: 5000,
            timeToStart: null,
            exercisesTime: 5000,
            currentExercisesTime: 0,
            exercisesTimeIntervalIncrement: 15,
        }
      },

      computed: {
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
        }
      },

      methods:{
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
            if(this.currentExercisesIndex == this.exercises.length-1){
                this.state = 'done';
                this.currentExercisesIndex = 0;
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

        stopExercises(){
            this.state = 'done'
        },

        showInfoAboutNextSet(){
            this.state = 'info'
            setTimeout(()=>this.state = 'none',this.infoTime);
        },

        async setItem(){
            await this.$options.store.setItem();
            await this.getItems();
        },

        async getItems(){
            this.storeItems = await this.$options.store.getItems();
        },

        async removeItem(key){
            await this.$options.store.remove(key);
            await this.getItems();
        },

      },

      created(){
          this.timeToStart = this.breakTime;
      },

      async ionViewWillEnter(){
        await this.$options.store.create();
        // await this.getItems();
        // console.log(this.$refs.time.style);
      },

    }
</script>

<style scoped>
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
  