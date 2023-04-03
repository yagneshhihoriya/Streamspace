import { Body, Controller, Delete, Get, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from './artist-create.dto';
import { ArtistService } from './artist.service';
import { UpdateArtistDto } from './artist.update.dto';
import { Response } from 'express';
import { ParseObjectIdPipe } from 'src/app.common';
import {ReturnType} from '../app.common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createArtistDto: CreateArtistDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.artistService.create(createArtistDto);
    return res.status(statusCode).json(data);
  }

  @Get('/')
  async findAll(@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.artistService.findAll();
    return res.status(statusCode).json(data);
  }

  @Get(':id')
  async findOne(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.artistService.findById(id);
    return res.status(statusCode).json(data);
  }

  @Put(':id')
  async update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateArtistDto: UpdateArtistDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.artistService.update(id, updateArtistDto);
    return res.status(statusCode).json(data);
  }

  @Delete(':id')
  async remove(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.artistService.remove(id);
    return res.status(statusCode).json(data);
  }
}
