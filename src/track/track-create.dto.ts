import { ApiProperty } from '@nestjs/swagger';
import {Track} from './track.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateTrackDto extends Track {
    @ApiProperty({
        description:'Track Name',
        example:'Track1'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description:'Track Duration',
        example:2
    })
    @IsNotEmpty()
    duration: number;

    @ApiProperty({
        description:'Artist Id',
        default:null
    })
    artistId: string;
}