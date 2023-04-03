import { Body, Controller, Delete, Get, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTrackDto } from './track-create.dto';
import { TrackService } from './track.service';
import { UpdateTrackDto } from './track-update.dto';
import { Response } from 'express';
import { ParseObjectIdPipe } from 'src/app.common';
import {ReturnType} from '../app.common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTrackDto: CreateTrackDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.trackService.create(createTrackDto);
    return res.status(statusCode).json(data);
  }

  @Get('/')
  async findAll(@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.trackService.findAll();
    return res.status(statusCode).json(data);
  }

  @Get(':id')
  async findOne(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.trackService.findById(id);
    return res.status(statusCode).json(data);
  }

  @Put(':id')
  async update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateTrackDto: UpdateTrackDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.trackService.update(id, updateTrackDto);
    return res.status(statusCode).json(data);
  }

  @Delete(':id')
  async remove(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.trackService.remove(id);
    return res.status(statusCode).json(data);
  }
}
