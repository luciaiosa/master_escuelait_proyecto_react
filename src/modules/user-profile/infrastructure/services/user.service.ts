import { UserProfile, UserProfileFavouriteMovie } from '../../domain/entities/user-profile.entity';

import { FavouriteStoreStrategyFactory } from '../../strategies/favourite-store/favouriteStoreStrategyFactory';

class UserService {
    addFavouriteMovie = (id: string, user: UserProfile): boolean => {
        return FavouriteStoreStrategyFactory.getStrategy(user).saveFavouriteMovie(id, user.id)
    }

    removeFavouriteMovie = (id: string, user: UserProfile): boolean => {
        return FavouriteStoreStrategyFactory.getStrategy(user).removeFavouriteMovie(id, user.id)
    }

    getFavouriteMovies = (user: UserProfile): UserProfileFavouriteMovie[] => {
        const values = FavouriteStoreStrategyFactory.getStrategy(user).getFavouriteMovies(user.id)
        return values || [];
    }
}

const instance = new UserService();

export default { instance }