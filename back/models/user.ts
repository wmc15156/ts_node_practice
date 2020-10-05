// 순환참조를 피하기 위해서  sequelize.ts파일을 만듬
// 순환참죄 두 모듈 중 하나가 빈 객체로 처리되어 문제가 발생 
// 순함참조는 타입선언 하는건 순환참조가 되도 상관없고 실제 런타임에 영향이 미치는건 순한참조가 되면 안됨

import { Model, DataTypes, BelongsToManyGetAssociationsMixin, HasManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin, BelongsToManyAddAssociationMixin,  } 
from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import Post from './post';

class User extends Model {
  public id!:number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly Posts?: Post[];
  public readonly Followings?: User[];
  public readonly Followers?: User[];

  public addFollowing!: BelongsToManyAddAssociationMixin<User, number>
  public getFollowings!: BelongsToManyGetAssociationsMixin<User>;
  public removeFollowings!: BelongsToManyRemoveAssociationMixin<User, number>;
  public getFollowers!: BelongsToManyGetAssociationsMixin<User>;
  public removeFollower!: BelongsToManyRemoveAssociationMixin<User, number>;
  public getPosts!: HasManyGetAssociationsMixin<Post>;
  
}

User.init({
  nickname: {
    type: DataTypes.STRING(20),
  },
  userId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }, 
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 1 대 다 hasMany : belongsTo
// 다 대 다 belongsToMany : belongsToMany
export const associate = (db:dbType) => {
  db.User.hasMany(db.Post, { as: 'Posts'});
  db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'})
  db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowingId'})
};

export default User;