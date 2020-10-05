import { Model, DataTypes, STRING} from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class HashTag extends Model {
  public readonly id: number;
  public name: string;
  public readonly createAt: Date;
  public readonly updateAt: Date;
}

HashTag.init({
  name: {
    type: STRING(20),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'HashTag',
  tableName: 'hashTag',
  charset: 'utf8mb4',
  collate: 'utfmb4_general_ci'
});

export const associate = (db:dbType) => {

};

export default HashTag;