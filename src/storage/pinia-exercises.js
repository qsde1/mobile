import { defineStore } from 'pinia'
import store from './storage'

export const useExercisesStore = defineStore('exercisesStore',{
    state: () => {
        return {
            exercise: null,
            storeIsCreated: false,
        }
    },

    actions:{
        async createStore(){
            let promise = new Promise((res,rej)=>{
                if(this.storeIsCreated){
                    res();
                } 
                else {
                    store.storage.create()
                      .then(s=>{
                          this.storeIsCreated = true;
                          res();
                      });
                }
            });
            return promise;
        },
        
        getExercises(){
            
        }
    }
})