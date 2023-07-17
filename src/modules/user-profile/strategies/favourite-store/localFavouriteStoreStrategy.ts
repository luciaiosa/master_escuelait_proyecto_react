import { FAVOURITE_MOVIES } from "@/shared/constants";
import { IFavouriteStoreStrategy } from "./favourite.store.strategy";
import { UserProfileFavouriteMovie } from "../../domain/entities/user-profile.entity";
import storageService from "@/shared/services/storage/storageService";

export class LocalFavouriteStoreStrategy implements IFavouriteStoreStrategy {

    saveFavouriteMovie(id: string, userId: string): boolean{
        const favoriteMovies = this.getFavouriteMovies(userId);
        const userFavouriteMovies = { userId, id };
        favoriteMovies.push(userFavouriteMovies);
        storageService.instance.saveLocalStorage(FAVOURITE_MOVIES, favoriteMovies);
        return true;
    }
    removeFavouriteMovie(id: string, userId: string): boolean{
        const favoriteMovies = this.getFavouriteMovies(userId);
        const filteredMovies = favoriteMovies.filter((movie) => movie.userId === userId && movie.id !== id)
        storageService.instance.saveLocalStorage(FAVOURITE_MOVIES, filteredMovies);
        return true;
    }
    getFavouriteMovies(userId: string): UserProfileFavouriteMovie[]{
        var values = storageService.instance.getFromLocalStorage(FAVOURITE_MOVIES);
        if (typeof values === "string"){
            const favouriteMovies = JSON.parse(values)
            return favouriteMovies;
        }
        return [];
    }
}