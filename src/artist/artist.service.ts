import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateArtistDto } from './artist-create.dto';
import type { UpdateArtistDto } from './artist.update.dto';
import { Artist, ArtistDocument } from './artist.schema'
import {ReturnType} from '../app.common'

@Injectable()
export class ArtistService {
  constructor(@InjectModel(Artist.name) private readonly artistModel: Model<ArtistDocument>) { }

  async create(createArtistDto: CreateArtistDto): Promise<ReturnType> {
    const result = await new this.artistModel(createArtistDto).save();
    if (result) return { statusCode: 201, data: result }
    return { statusCode: 400, error: 'Error While Adding Artist' }
  }

  async findAll(): Promise<ReturnType> {
    const result = await this.artistModel.find().exec();
    if (result && result.length) return { statusCode: 200, data: result }
    return { statusCode: 400, data: result, error: 'No Data Found' }
  }

  async findById(id: string): Promise<ReturnType> {
    const result = await this.artistModel.findById(id);
    if (result) return { statusCode: 200, data: result }
    return { statusCode: 404, data: result, error: 'No Data Found' }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<ReturnType> {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.artistModel.findByIdAndUpdate(id, updateArtistDto);
    const result_ = await this.artistModel.findById(id);
    return { statusCode: 200, data: result_ }
  }

  async remove(id: string) {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.artistModel.findByIdAndRemove(id);
    return { statusCode: 204, data: "Data Deleted Successfully" }
  }
}
