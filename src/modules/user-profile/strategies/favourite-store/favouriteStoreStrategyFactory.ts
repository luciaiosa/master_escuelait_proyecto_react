import { CloudFavouriteStoreStrategy } from './cloudFavouriteStoreStrategy';
import { LocalFavouriteStoreStrategy } from './localFavouriteStoreStrategy';
import { StrategyManager } from './favouriteStoreStrategyManager';
import { UserProfile } from '../../domain/entities/user-profile.entity';

export class FavouriteStoreStrategyFactory {

    static getStrategy(user: UserProfile): StrategyManager {
        if (user.favouriteSaveOnCloud) {
            // return new StrategyManager(new CloudFavouriteStoreStrategy(this.getCredentials()))
            return new StrategyManager(new CloudFavouriteStoreStrategy())
        }
        return new StrategyManager(new LocalFavouriteStoreStrategy())
    }
}