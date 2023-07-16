import { StrategyManager } from './strategyManager';
import { CloudFavouriteStoreStrategy } from './cloudFavouriteStoreStrategy';
import { IUser } from '@/common/interfaces';
import { LocalFavouriteStoreStrategy } from './localFavouriteStoreStrategy';

export class FavouriteStoreStrategyFactory {

    static getStrategy(user: IUser): StrategyManager {
        if (user.favouriteSaveOnCloud) {
            // return new StrategyManager(new CloudFavouriteStoreStrategy(this.getCredentials()))
            return new StrategyManager(new CloudFavouriteStoreStrategy())
        }
        return new StrategyManager(new LocalFavouriteStoreStrategy())
    }
}