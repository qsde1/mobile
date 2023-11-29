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

    async setItem(key,value){
        await this.store.set(key, value);
    },

    async remove(key){
        await this.store.remove(key);
    },

    async create(){
        await this.store.create();
    }
}

