import { IFavouriteStoreStrategy, IUserMovie } from "@/common/interfaces";

export class StrategyManager {
    private _strategy: IFavouriteStoreStrategy;
    
    constructor(strategy: IFavouriteStoreStrategy) {
        this._strategy = strategy;
    }

    saveFavouriteMovie(id: string, userId: string): boolean{
        return this._strategy.saveFavouriteMovie(id, userId);
    }

    removeFavouriteMovie(id: string, userId: string): boolean{
        return this._strategy.removeFavouriteMovie(id, userId);
    }

    getFavouriteMovies(userId: string): IUserMovie[]{
        return this._strategy.getFavouriteMovies(userId);
    }
}

