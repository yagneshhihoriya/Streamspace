import { ApiProperty } from '@nestjs/swagger';
import { Album } from './album.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateAlbumDto extends Album {
    @ApiProperty({
        description:'Album Name',
        example:'Album1'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description:'Album Year',
        example:2
    })
    @IsNotEmpty()
    year: number;

    @ApiProperty({
        description:'ArtistId',
        default:null
    })
    artistId: string;
}