import {
    PartialType
  } from '@nestjs/mapped-types';
  import {
    CreateFavoritesDto
  } from './favorites-create.dto';
  
  export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {}