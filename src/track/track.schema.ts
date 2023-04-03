import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Artist } from '../artist/artist.schema'

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', default: null })
    artistId: Artist | string | null;
    @Prop()
    duration: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);