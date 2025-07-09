import Dexie, {type Table} from 'dexie';
import type {User} from "./@types/User.ts";
import type {Fav} from "./@types/Fav.ts";
import type {Seen} from "./@types/Seen.ts";

export class MVDB extends Dexie {
    users!: Table<User, number>;
    fav!: Table<Fav, number>;
    seen!: Table<Seen, number>;

    constructor() {
        super('MVDB');

        this.version(1).stores({
            users: '++id, username, email',
            fav: '++id, media_id, type, title, vote_average, vote_number, image, user_id',
            seen: '++id, media_id, type, title, vote_average, vote_number, image, user_id',
        });
    }
}

export const db = new MVDB();
