import { Storage } from '@ionic/storage';

const store = new Storage();

export default {
    store,
    async getItems(){
        let keys = await this.store.keys()
        let items = [];

        for (const key of keys) {
            let value = await this.store.get(key);
            items.push({key,value});
        }

        return items;
    },

    async getItem(key){
        let item = await this.store.get(key);
        return item;
    },

    async setItem(key,value){
        await this.store.set(key, value);
    },

    async remove(key){
        await this.store.remove(key);
    },

    async create(){
        await this.store.create();
    },

    async addSetInShedule(timestamp){
        await this.deleteOldSetFromShadule();

        let shedule = null;
        let keys = await this.store.keys();
        if(!await keys.includes('shedule')){
            shedule = [];
        } else {
            shedule = await this.store.get('shedule')
        }

        if(shedule){
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
        let keys = await this.store.keys();
        if(!await keys.includes('shedule')){
            shedule = [];
        } else {
            shedule = await this.store.get('shedule')
        }

        if(shedule){
            shedule = [...shedule.filter(t=>t != timestamp)];
            shedule.sort();
            await this.setItem('shedule',shedule);
        }
    },

    async deleteOldSetFromShadule(){
        let keys = await this.store.keys();
        if(!await keys.includes('shedule')){
            return;
        }

        let shedule = await this.store.get('shedule')
        let timestamp = Date.now()
        shedule = shedule.filter(t=>{
            return t < timestamp + (1000 * 60 * 30)
        })

        await this.store.set('shedule',shedule);
        console.log(await this.getItem('shedule'));
    },

    async clear(){
        await this.store.clear();
    }
}

