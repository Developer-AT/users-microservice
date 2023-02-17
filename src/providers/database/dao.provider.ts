import { ObjectId, Types, Model, Document } from 'mongoose';

export class Dao {
    public ObjectId = Types.ObjectId;
    protected modelName: Model<Document>;

    constructor(model) {
        this.modelName = model;
    }

    async saveData(data: any) {
        try {
            let ModelName = new this.modelName(data);
            return await ModelName.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getDataById(id: string | ObjectId) {
        try {
            return await this.modelName.findById(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async updateOne(criteria: any, update: any, options: any = {}) {
        try {
            return await this.modelName.updateOne(criteria, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async remove(criteria: any) {
        try {
            return await this.modelName.deleteMany(criteria);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async removeOne(criteria: any) {
        try {
            return await this.modelName.deleteOne(criteria);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findOne(criteria, options: any = {}) {
        try {
            return await this.modelName.findOne(criteria, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
