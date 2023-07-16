import { IFavouriteStoreStrategy, IUserMovie } from "@/common/interfaces";

export class CloudFavouriteStoreStrategy implements IFavouriteStoreStrategy {

    saveFavouriteMovie(id: string, userId: string): boolean {
        console.log(`Save user favourite movie into database; movie id: ${id}, user id: ${userId}`);
        return true;
    }
    removeFavouriteMovie(id: string, userId: string): boolean {
        console.log(`Remove user favourite movie into database; movie id: ${id}, user id: ${userId}`);
        return true;
    }
    getFavouriteMovies(userId: string): IUserMovie[]{
        console.log(`Retrieve user favourite movies from database; user id: ${userId}`);
        return [];
    }
}