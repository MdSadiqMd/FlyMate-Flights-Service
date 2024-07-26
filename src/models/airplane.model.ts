import { Model, DataTypes, Sequelize } from 'sequelize';

interface AirplaneAttributes {
  modelNumber: string;
  capacity: number;
}

interface AirplaneCreationAttributes extends AirplaneAttributes { }

class Airplane extends Model<AirplaneAttributes, AirplaneCreationAttributes> implements AirplaneAttributes {
  public readonly id!: number;
  public modelNumber!: string;
  public capacity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  static associate(models: any): void {

  }
}

const initAirplaneModel = (sequelize: Sequelize): typeof Airplane => {
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });

  return Airplane;
};

export default initAirplaneModel;