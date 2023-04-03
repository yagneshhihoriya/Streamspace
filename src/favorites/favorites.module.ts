/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import {  } from './favorites.controller';
// import { AppService } from './favorites.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './favorites.controller';
import {Favorites,FavoritesSchema} from './favorites.schema';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Favorites.name,
        schema:FavoritesSchema
      }
    ])
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
