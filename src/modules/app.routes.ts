export const moviesRoute = () => "/movies";
export const signinRoute = () => '/signin';
export const loginRoute = () => '/login';

export const movieDetailRoute = (id: string|number = ':id') => `/movies/${id}`; 