import { 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  Sequelize, 
  DataTypes 
} from 'sequelize';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare firstName: CreationOptional<string>;
  declare lastName: CreationOptional<string>;
  declare image: CreationOptional<string>;
}

const userModel = (sequelize: Sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      tableName: 'User',
      timestamps: true
    }
  );
};

export { userModel };