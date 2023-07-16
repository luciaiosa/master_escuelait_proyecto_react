import { UserProfileFavouriteMovie } from "../../domain/entities/user-profile.entity";

export interface IFavouriteStoreStrategy {
    saveFavouriteMovie(id: string, userId: string): boolean;
    removeFavouriteMovie(id: string, userId: string): boolean;
    getFavouriteMovies(userId: string): UserProfileFavouriteMovie[];
}