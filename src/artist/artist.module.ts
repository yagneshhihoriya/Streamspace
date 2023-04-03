/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import {  } from './artist.controller';
// import { AppService } from './artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist.controller';
import {Artist,ArtistSchema} from './artist.schema';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Artist.name,
        schema:ArtistSchema
      }
    ])
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
