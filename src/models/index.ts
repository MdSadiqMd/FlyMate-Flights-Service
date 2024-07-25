import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import process from 'process';

interface ModelWithAssociations extends Model {
    associate?(models: Models): void;
}

interface DbModels {
    [key: string]: ModelStatic<ModelWithAssociations> | undefined;
}

interface Models extends DbModels {
    sequelize?: any;
    Sequelize?: any;
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env] as {
    use_env_variable?: string;
    database?: string;
    username?: string;
    password?: string;
    [key: string]: any;
};

const db: Models = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
    sequelize = new Sequelize(config.database!, config.username!, config.password!, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.ts' &&
            file.indexOf('.test.ts') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
        if (model && model.name) {
            db[model.name] = model;
        }
    });

Object.keys(db).forEach(modelName => {
    const model = db[modelName] as any;
    if (model && typeof model.associate === 'function') {
        model.associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;