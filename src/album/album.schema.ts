import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Artist } from '../artist/artist.schema'

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', default: null })
    artistId: Artist | string | null;
    @Prop()
    year: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);