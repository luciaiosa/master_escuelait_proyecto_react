import { IFavouriteStoreStrategy, IUserMovie } from '@/common/interfaces';
import services from './index';
import { FAVOURITE_MOVIES } from "@/common/constants";

export class LocalFavouriteStoreStrategy implements IFavouriteStoreStrategy {

    saveFavouriteMovie(id: string, userId: string): boolean{
        const favoriteMovies = this.getFavouriteMovies(userId);
        const userFavouriteMovies = { userId, id };
        favoriteMovies.push(userFavouriteMovies);
        services.storageService.saveLocalStorage(FAVOURITE_MOVIES, favoriteMovies);
        return true;
    }
    removeFavouriteMovie(id: string, userId: string): boolean{
        const favoriteMovies = this.getFavouriteMovies(userId);
        const filteredMovies = favoriteMovies.filter((movie) => movie.userId === userId && movie.id !== id)
        services.storageService.saveLocalStorage(FAVOURITE_MOVIES, filteredMovies);
        return true;
    }
    getFavouriteMovies(userId: string): IUserMovie[]{
        var values = services.storageService.getFromLocalStorage(FAVOURITE_MOVIES);
        if (typeof values === "string"){
            const favouriteMovies = JSON.parse(values)
            return favouriteMovies;
        }
        return [];
    }
}