/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import {  } from './track.controller';
// import { AppService } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackController } from './track.controller';
import {Track,TrackSchema} from './track.schema';
import { TrackService } from './track.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Track.name,
        schema:TrackSchema
      }
    ])
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
