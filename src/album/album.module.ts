/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import {  } from './album.controller';
// import { AppService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import {Album,AlbumSchema} from './album.schema';
import { AlbumService } from './album.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Album.name,
        schema:AlbumSchema
      }
    ])
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
