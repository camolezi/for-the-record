import AudioEntriesDb from './AudioEntriesDb';
import LocalDatabase from './LocalDatabase';
import UserDb from './UserDb';

const localdb = new LocalDatabase();
localdb.open().catch((e) => console.log(e));

const audiodb = new AudioEntriesDb(localdb);
export { audiodb };

const userdb = new UserDb(localdb);
export { userdb };
