import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateAlbumDto } from './album-create.dto';
import type { UpdateAlbumDto } from './album-update.dto';
import { Album, AlbumDocument } from './album.schema'
import {ReturnType} from '../app.common'

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>) { }

  async create(createAlbumDto: CreateAlbumDto): Promise<ReturnType> {
    const result = await new this.albumModel(createAlbumDto).save();
    if (result) return { statusCode: 201, data: result }
    return { statusCode: 400, error: 'Error While Adding Album' }
  }

  async findAll(): Promise<ReturnType> {
    const result = await this.albumModel.find().populate('artistId').exec();
    if (result && result.length) return { statusCode: 200, data: result }
    return { statusCode: 400, data: result, error: 'No Data Found' }
  }

  async findById(id: string): Promise<ReturnType> {
    const result = await this.albumModel.findById(id).populate('artistId');
    if (result) return { statusCode: 200, data: result }
    return { statusCode: 404, data: result, error: 'No Data Found' }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<ReturnType> {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.albumModel.findByIdAndUpdate(id, updateAlbumDto);
    const result_ = await this.albumModel.findById(id);
    return { statusCode: 200, data: result_ }
  }

  async remove(id: string) {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.albumModel.findByIdAndRemove(id);
    return { statusCode: 204, data: "Data Deleted Successfully" }
  }
}
