import { DataTypes, Model, Sequelize, ModelStatic } from "sequelize";

interface FlightAttributes {
    flightNumber: string;
    airplaneId: number;
    departureAirportId: string;
    arrivalAirportId: string;
    arrivalTime: Date;
    departureTime: Date;
    price: number;
    boardingGate?: string;
    totalSeats: number;
}

export class Flight extends Model<FlightAttributes> implements FlightAttributes {
    public flightNumber!: string;
    public airplaneId!: number;
    public departureAirportId!: string;
    public arrivalAirportId!: string;
    public arrivalTime!: Date;
    public departureTime!: Date;
    public price!: number;
    public boardingGate?: string;
    public totalSeats!: number;

    static associate(models: { [key: string]: ModelStatic<Model>; }) {
        Flight.belongsTo(models.Airplane, {
            foreignKey: 'airplaneId',
            as: 'airplaneDetail'
        });
        Flight.belongsTo(models.Airport, {
            foreignKey: 'departureAirportId',
            as: 'departureAirport',
        });
        Flight.belongsTo(models.Airport, {
            foreignKey: 'arrivalAirportId',
            as: 'arrivalAirport',
        });
    }
}

export function initializeFlightModel(sequelize: Sequelize): typeof Flight {
    Flight.init({
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        airplaneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        departureAirportId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrivalAirportId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrivalTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        departureTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boardingGate: {
            type: DataTypes.STRING
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Flight',
    });

    return Flight;
}