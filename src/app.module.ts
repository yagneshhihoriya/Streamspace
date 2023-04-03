import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module'
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ParseObjectIdPipe } from './app.common';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, { dbName: process.env.MONGO_DB_NAME }),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule
  ],
  controllers: [AppController],
  providers: [AppService,ParseObjectIdPipe],
})
export class AppModule { }
