import {
    PartialType
  } from '@nestjs/mapped-types';
  import {
    CreateAlbumDto
  } from './album-create.dto';
  
  export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}