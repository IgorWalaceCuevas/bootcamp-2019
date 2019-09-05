import Sequilize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequilize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}
