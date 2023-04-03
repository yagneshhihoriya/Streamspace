import { Body, Controller, Delete, Get, Param, Post, Put,Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFavoritesDto } from './favorites-create.dto';
import { FavoritesService } from './favorites.service';
import { UpdateFavoritesDto } from './favorites-update.dto';
import { Response } from 'express';
import { ParseObjectIdPipe } from 'src/app.common';
import {ReturnType} from '../app.common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createFavoritesDto: CreateFavoritesDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.favoritesService.create(createFavoritesDto);
    return res.status(statusCode).json(data);
  }

  @Get('/')
  async findAll(@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.favoritesService.findAll();
    return res.status(statusCode).json(data);
  }

  @Get(':id')
  async findOne(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.favoritesService.findById(id);
    return res.status(statusCode).json(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateFavoritesDto: UpdateFavoritesDto,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.favoritesService.update(id, updateFavoritesDto);
    return res.status(statusCode).json(data);
  }

  @Delete(':id')
  async remove(@Param('id',ParseObjectIdPipe) id: string,@Res() res:Response) {
    const {statusCode,...data}:ReturnType = await this.favoritesService.remove(id);
    res.status(statusCode).json({data:'Data Deleted Successfully'});
  }
}
