import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateTrackDto } from './track-create.dto';
import type { UpdateTrackDto } from './track-update.dto';
import { Track, TrackDocument } from './track.schema';
import {ReturnType} from '../app.common'

@Injectable()
export class TrackService {
  constructor(@InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>) { }

  async create(createTrackDto: CreateTrackDto): Promise<ReturnType> {
    const result = await new this.trackModel(createTrackDto).save();
    if (result) return { statusCode: 201, data: result }
    return { statusCode: 400, error: 'Error While Adding Track' }
  }

  async findAll(): Promise<ReturnType> {
    const result = await this.trackModel.find().populate('artistId').exec();
    if (result && result.length) return { statusCode: 200, data: result }
    return { statusCode: 400, data: result, error: 'No Data Found' }
  }

  async findById(id: string): Promise<ReturnType> {
    const result = await this.trackModel.findById(id).populate('artistId');
    if (result) return { statusCode: 200, data: result }
    return { statusCode: 404, data: result, error: 'No Data Found' }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ReturnType> {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.trackModel.findByIdAndUpdate(id, updateTrackDto);
    const result_ = await this.trackModel.findById(id);
    return { statusCode: 200, data: result_ }
  }

  async remove(id: string) {
    const result = await this.findById(id)
    if (result.statusCode == 404 && result.error) return { statusCode: 404, data: result.data, error: result.error }
    await this.trackModel.findByIdAndRemove(id);
    return { statusCode: 204, data: "Data Deleted Successfully" }
  }
}
