import { ApiProperty } from '@nestjs/swagger';
import {Artist} from './artist.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateArtistDto extends Artist {
    @ApiProperty({
        description:'Artist Name',
        example:'Artist1'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description:'Grammy',
        example:true
    })
    @IsNotEmpty()
    grammy: boolean;
}