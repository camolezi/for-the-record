import LocalDatabase from './LocalDatabase';

export default class UserDb {
  private readonly database: LocalDatabase;

  constructor(database: LocalDatabase) {
    this.database = database;
  }
}
