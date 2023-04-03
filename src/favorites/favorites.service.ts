import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateFavoritesDto } from './favorites-create.dto';
import type { UpdateFavoritesDto } from './favorites-update.dto';
import { Favorites, FavoritesDocument } from './favorites.schema'

type ReturnType = {
  statusCode: number;
  data?: any;
  error?: string | Error;
}

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorites.name) private readonly favoritesModel: Model<FavoritesDocument>) { }

  async create(createFavoritesDto: CreateFavoritesDto): Promise<ReturnType> {
    const result = await new this.favoritesModel(createFavoritesDto).save();
    if (result) return { statusCode: 201, data: result }
    return { statusCode: 400, error: 'Error While Adding Favorites' }
  }

  async findAll(): Promise<ReturnType> {
    const result = await this.favoritesModel.find().populate(['artists','albums','tracks']).exec();
    if (result && result.length) return { statusCode: 200, data: result }
    return { statusCode: 400, data: result, error: 'No Data Found' }
  }

  async findById(id: string): Promise<ReturnType> {
    const result = await this.favoritesModel.findById(id).populate(['artists','albums','tracks']);
    if (result) return { statusCode: 200, data: result }
    return { statusCode: 404, data: result, error: 'No Data Found' }
  }

  async update(id: string, updateFavoritesDto: UpdateFavoritesDto): Promise<ReturnType> {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.favoritesModel.findByIdAndUpdate(id, updateFavoritesDto);
    const result_ = await this.favoritesModel.findById(id);
    return { statusCode: 200, data: result_ }
  }

  async remove(id: string) {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    // await this.favoritesModel.findByIdAndRemove(id);
    return { statusCode: 204, data: "Data Deleted Successfully" }
  }
}
