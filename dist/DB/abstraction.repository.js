"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
class AbstractRepository {
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        const doc = new this.model(item);
        return await doc.save();
    }
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async getOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async update(filter, update, options) {
        return await this.model.updateOne(filter, update);
    }
    async updateMany(filter, update, options) {
        return await this.model.updateMany(filter, update);
    }
    async deleteOne(filter, options) {
        return await this.model.deleteOne(filter, options);
    }
    async deleteMany(filter, options) {
        return await this.model.deleteMany(filter, options);
    }
    async findOneAndDelete(filter, options) {
        return await this.model.findOneAndDelete(filter, options);
    }
    async getAll(filter, projection, options, sort) {
        return await this.model.find(filter, projection, options).sort(sort);
    }
}
exports.AbstractRepository = AbstractRepository;
