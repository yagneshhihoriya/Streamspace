import { Body, Controller, Delete, Get, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from './album-create.dto';
import { AlbumService } from './album.service';
import { UpdateAlbumDto } from './album-update.dto';
import { Response } from 'express';
import { ParseObjectIdPipe } from 'src/app.common';
import {ReturnType} from '../app.common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAlbumDto: CreateAlbumDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.albumService.create(createAlbumDto);
    return res.status(statusCode).json(data);
  }

  @Get('/')
  async findAll(@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.albumService.findAll();
    return res.status(statusCode).json(data);
  }

  @Get(':id')
  async findOne(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.albumService.findById(id);
    return res.status(statusCode).json(data);
  }

  @Put(':id')
  async update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.albumService.update(id, updateAlbumDto);
    return res.status(statusCode).json(data);
  }

  @Delete(':id')
  async remove(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.albumService.remove(id);
    return res.status(statusCode).json(data);
  }
}
