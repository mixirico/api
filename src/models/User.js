import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        name: Sequelize.STRING(255),
        email: Sequelize.STRING(255),
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING(255),
      },
      {
        sequelize,
        tableName: 'Users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate() {}

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
