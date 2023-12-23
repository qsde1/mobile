import { defineStore } from 'pinia'
import store from './storage'


export const useSheduleStore = defineStore('sheduleStore', {
  state: () => {
    return {
        shedule: null,
        stat: null,
        storeIsCreated: false,
    }
  },

  getters:{
    getNearestDateFromShedule(){
      let thirtyMinutesTimeStamp = 1_800_000;
      let date = new Date();
      let nearDate = this.shedule.find(s=>{
        return s > (date.getTime() - thirtyMinutesTimeStamp) &&
               s < (date.getTime() + thirtyMinutesTimeStamp)
      })
      return nearDate;
    }
  },

  actions:{
    async createStore(){
      let promise = new Promise((res,rej)=>{
        if(this.storeIsCreated){
          res()
        }
        else{
          store.storage.create()
            .then((s)=>{
              // store.storage.clear();
              this.storeIsCreated = true;
              res();
            });
        }
      });
      return promise;
    },

    async getShedule(){
      this.shedule = null;
      this.createStore()
        .then(()=>{
          store.getItem('shedule')
            .then(s=>{
                if(s == null)
                  this.shedule = [];
                else {                  
                  this.shedule = s;
                }
                // console.log('new shedule: ' + this.shedule);
            });
        })
    },

    async addSetInShedule(timestamp){
      this.createStore()
        .then(async ()=>{
          await store.addSetInShedule(timestamp);
          this.getShedule();
        });
    },

    async removeSetFromShedule(timestamp){
      await store.removeSetFromShedule(timestamp)
      await this.getShedule();
    },

    async getStat(){
      this.createStore()
      .then(s=>{
        store.getItem('stat')
          .then(s=>{
            console.log('stat: ' + s);
            if(s == null){
              this.stat = [];
            } else {
              this.stat = s;
            }
          })        
      });
    },

    async addSetInStat(stat, type){
      store.addSetInStat(stat, type)
        .then(()=>this.getStat());
    }
  },
})