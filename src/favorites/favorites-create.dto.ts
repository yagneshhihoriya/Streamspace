import {Favorites} from './favorites.entity'
import { ArrayNotEmpty,ArrayNotContains } from 'class-validator'

export class CreateFavoritesDto extends Favorites {
    @ArrayNotEmpty()
    @ArrayNotContains([""])
    artists: string[];

    @ArrayNotEmpty()
    @ArrayNotContains([""])
    albums: string[];

    @ArrayNotEmpty()
    @ArrayNotContains([""])
    tracks: string[];
}