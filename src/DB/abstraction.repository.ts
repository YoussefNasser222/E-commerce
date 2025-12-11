import {
  Model,
  ProjectionType,
  QueryOptions,
  QueryFilter,
  UpdateQuery,
  MongooseUpdateQueryOptions,
  MongooseBaseQueryOptions,
  SortOrder,
} from "mongoose";
export abstract class AbstractRepository<T> {
  constructor(protected model: Model<T>) {}
  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return await doc.save();
  }
  async exist(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.findOne(filter, projection, options);
  }
  async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.findOne(filter, projection, options);
  }
  async update(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions
  ) {
    return await this.model.updateOne(filter, update);
  }
  async updateMany(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions
  ) {
    return await this.model.updateMany(filter, update);
  }
  async deleteOne(filter: QueryFilter<T>, options?: MongooseBaseQueryOptions) {
    return await this.model.deleteOne(filter, options);
  }
  async deleteMany(filter: QueryFilter<T>, options?: MongooseBaseQueryOptions) {
    return await this.model.deleteMany(filter, options);
  }
  async findOneAndDelete(
    filter: QueryFilter<T>,
    options?: MongooseBaseQueryOptions
  ) {
    return await this.model.findOneAndDelete(filter, options);
  }
  async getAll(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
    sort? : Record <string , SortOrder>
  ) {
    return await this.model.find(filter, projection, options).sort(sort);
  }
}
