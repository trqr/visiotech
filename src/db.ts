import Dexie, {type Table} from 'dexie';
import type {User} from "./@types/User.ts";

export class MVDB extends Dexie {
    users!: Table<User, number>; // table + type de clé

    constructor() {
        super('MVDB');
        this.version(1).stores({
            users: '++id, username, email',
        });
    }
}

export const db = new MVDB();
