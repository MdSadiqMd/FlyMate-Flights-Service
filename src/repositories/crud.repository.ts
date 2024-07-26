import { Model, ModelStatic, WhereOptions, CreationAttributes } from 'sequelize';
import { StatusCodes } from 'http-status-codes';

import logger from "../config/logger.config";
import AppError from "../errors/App.error";

class CrudRepository<T extends Model<T>> {
    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: CreationAttributes<T>): Promise<T> {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error(`Error in creating data in crud repository: ${error}`);
            throw error;
        }
    }

    async destroy(id: number): Promise<number> {
        try {
            const response = await this.model.destroy({
                where: {
                    id: id
                } as unknown as WhereOptions<T>
            });
            if (!response) {
                throw new AppError('Not able to find the resource to destroy in Crud Repository', StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            logger.error(`Error in deleting data in crud repository: ${error}`);
            throw error;
        }
    }

    async get(id: number): Promise<T | null> {
        try {
            const response = await this.model.findByPk(id);
            if (!response) {
                throw new AppError('Not able to find the resource in Crud Repository', StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            logger.error(`Error in getting data in crud repository: ${error}`);
            throw error;
        }
    }

    async getAll(): Promise<T[]> {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error(`Error in getting all data in crud repository: ${error}`);
            throw error;
        }
    }

    async update(id: number, data: any): Promise<[number, T[]]> {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                } as unknown as WhereOptions<T>,
                returning: true
            }) as [number, T[]];
            return response;
        } catch (error) {
            logger.error(`Error in updating data in crud repository: ${error}`);
            throw error;
        }
    }
}

export default CrudRepository;
