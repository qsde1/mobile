import { Storage } from '@ionic/storage';

const storage = new Storage();

export default {
    storage,
    async getItems(){
        let keys = await this.storage.keys()
        let items = [];

        for (const key of keys) {
            let value = await this.storage.get(key);
            items.push({key,value});
        }

        return items;
    },

    async getItem(key){
        if(key == 'shedule'){
            await this.deleteOldSetFromShadule();
        }
        let item = await this.storage.get(key);
        return item;
    },

    async setItem(key,value){
        await this.storage.set(key, value);
    },

    async remove(key){
        await this.storage.remove(key);
    },

    async create(){
        await this.storage.create();
    },

    async addSetInShedule(timestamp){
        await this.deleteOldSetFromShadule();
        console.log(timestamp);

        let shedule = null;
        let keys = await this.storage.keys();
        if(!await keys.includes('shedule')){
            shedule = [];
        } else {
            shedule = await this.storage.get('shedule');
        }

        if(shedule){
            let dateNow = Date.now();
            if(dateNow > timestamp + (1_800_000))
                return;

            if(!shedule.includes(timestamp))
                shedule = [...shedule,timestamp];
        } else {
            shedule = [timestamp];
        }
        shedule.sort();
        await this.setItem('shedule',shedule);
    },

    async removeSetFromShedule(timestamp){
        await this.deleteOldSetFromShadule()
        
        let shedule = null;
        let keys = await this.storage.keys();
        if(!await keys.includes('shedule')){
            shedule = [];
        } else {
            shedule = await this.storage.get('shedule')
        }

        if(shedule){
            shedule = [...shedule.filter(t=>t != timestamp)];
            shedule.sort();
            await this.setItem('shedule',shedule);
        }
    },

    async deleteOldSetFromShadule(){
        let keys = await this.storage.keys();
        if(!await keys.includes('shedule')){
            return;
        }

        let shedule = await this.storage.get('shedule');

        let timestamp = Date.now();
        let expiredSets = shedule.filter(t=>{
            return t + (1000 * 60 * 30) < timestamp;
            // return t < timestamp;
        });

        if(expiredSets.length > 0) {
            console.log(expiredSets);
            expiredSets.forEach(async s=>{
                await this.addSetInStat(s,'overdue');
            });
        }

        shedule = shedule.filter(t=>{
            return t + (1000 * 60 * 30) > timestamp;
            // return t > timestamp;
        })
        await this.storage.set('shedule',shedule);
    },

    async getStat(){

    },

    async addSetInStat(set,type){
        let keys = await this.storage.keys();
        let stat = null;
        if(!await keys.includes('stat')){
            stat = [];
        } else {
            stat = await this.storage.get('stat');
        }

        if(stat.length == 0){
            let statItem = {
                type: type,
                sets: [set],
            }
            stat.push(statItem);
        } else {
            let lastStat = stat[stat.length-1];
            if(type=='done'){            
                if(lastStat.type == 'done'){
                    lastStat.sets.push(set);
                } else {
                    let statItem = {
                        type: 'done',
                        sets: [set],
                    }
                    stat.push(statItem);
                }
            } else {
                if(lastStat.type == 'overdue'){
                    lastStat.sets.push(set);
                } else {
                    let statItem = {
                        type: 'overdue',
                        sets: [set],
                    }
                    stat.push(statItem);
                }
            }
        }

        await this.storage.set('stat',stat);
    },

    async clear(){
        await this.storage.clear();
    }
}

