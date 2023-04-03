import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop()
    grammy: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);