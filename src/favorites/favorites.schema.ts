import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Album } from 'src/album/album.schema';
import { Track } from 'src/track/track.schema';
import {Artist} from '../artist/artist.schema'

export type FavoritesDocument = Favorites & Document;

@Schema()
export class Favorites {
    @Prop()
    id: string;
    @Prop({type:[{ type:mongoose.Schema.Types.ObjectId,ref:'Artist',required:true }]})
    artists: Artist[]
    @Prop({type:[{ type:mongoose.Schema.Types.ObjectId,ref:'Album',required:true }]})
    albums:Album[];
    @Prop({type:[{ type:mongoose.Schema.Types.ObjectId,ref:'Track',required:true }]})
    tracks:Track[];
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);