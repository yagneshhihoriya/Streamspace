import {
    PartialType
  } from '@nestjs/mapped-types';
  import {
    CreateTrackDto
  } from './track-create.dto';
  
  export class UpdateTrackDto extends PartialType(CreateTrackDto) {}