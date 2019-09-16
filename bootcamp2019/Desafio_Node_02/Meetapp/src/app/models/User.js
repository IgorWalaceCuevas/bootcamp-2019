import Sequilize, { Model } from 'sequelize';
import bycript from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequilize.STRING,
        email: Sequilize.STRING,
        password: Sequilize.VIRTUAL,
        password_hash: Sequilize.STRING,
        provider: Sequilize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bycript.hash(user.password, 8);
      }
    });
    return this;
  }
  checkPassword(password) {
    return bycript.compare(password, this.password_hash);
  }
}

export default User;
