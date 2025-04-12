import {exit} from 'node:process';
import fs from 'node:fs';
export class DataSource {
    data = [];
    constructor(fileName) {
        this.fileName = fileName;
        console.log('hello from constructor', this.fileName);
        if(fs.existsSync(this.fileName)){
            this._load(); 
        } else {
            this._save();
        }
    }

    getAll() {
        return this.data;
    }

    getOne(id) {
        const found = this.data.find(itm =>{
            return +itm.id === +id;
        });
        if(found) {
            return found;
        }
        return false;
    }

    add(user) {
        const found = this.data.find(itm =>{
            return itm.id === user.id;
        });
        if(found) {
            return false;
        }
        this.data.push(user);
        this._save();
        return user;
    }

    edit(user, id) {
        for (let index = 0; index < this.data.length; index++) {
            const element = array[index];
            if(element.id === id) {
                this.data[index] = user;
            }
        }
        this._save();
    }

    delete(id) {
        this.data = this.data.filter(itm=>{
            return +itm.id !== +id;
        });
        this._save();
        return true;
    }

    _load(){
        try {
            this.data = JSON.parse(fs.readFileSync(this.fileName));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }

    _save(){
        try {
            fs.writeFileSync(this.fileName, JSON.stringify(this.data));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }
}