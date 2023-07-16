interface IUserProfileFavouriteMovie {
    userId: string,
    id: string
}

interface IUserProfile {
    id: string;
    email: string;
    favouriteSaveOnCloud: boolean;
}

export type UserProfileFavouriteMovie = IUserProfileFavouriteMovie;
export type UserProfile = IUserProfile;

