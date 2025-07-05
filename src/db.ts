import Dexie, {type Table} from 'dexie';
import type {User} from "./@types/User.ts";
import type {Fav} from "./@types/Fav.ts";

export class MVDB extends Dexie {
    users!: Table<User, number>;
    fav!: Table<Fav, number>;

    constructor() {
        super('MVDB');

        this.version(1).stores({
            users: '++id, username, email',
        });

        this.version(2).stores({
            users: '++id, username, email',
            fav: 'id, type, title, vote_average, vote_number, image, user_id',
        });
    }
}

export const db = new MVDB();
