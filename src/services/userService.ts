import { IUser, IUserMovie } from '@/common/interfaces';
import { FavouriteStoreStrategyFactory } from './favouriteStoreStrategyFactory';

export class UserService {
    addFavouriteMovie = (id: string, user: IUser): boolean => {
        return FavouriteStoreStrategyFactory.getStrategy(user).saveFavouriteMovie(id, user.id)
    }

    removeFavouriteMovie = (id: string, user: IUser): boolean => {
        return FavouriteStoreStrategyFactory.getStrategy(user).removeFavouriteMovie(id, user.id)
    }

    getFavouriteMovies = (user: IUser): IUserMovie[] => {
        const values = FavouriteStoreStrategyFactory.getStrategy(user).getFavouriteMovies(user.id)
        return values || [];
    }
}