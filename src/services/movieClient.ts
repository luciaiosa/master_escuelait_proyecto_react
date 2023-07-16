import { IMovieSearchRequest } from '@/common/interfaces';
import { AxiosInstance} from 'axios';

export class MoviesClient {

    private axios: AxiosInstance;
    private apiKey: string;

    constructor(axios: AxiosInstance, apiKey: string){
        this.axios = axios;
        this.apiKey = apiKey;
    }

    fetch = async (searchRequest: IMovieSearchRequest) => {
        const filter = {
            s: searchRequest.searchTerm === undefined || searchRequest.searchTerm === "" ? "all" : searchRequest.searchTerm, 
            apikey: this.apiKey, 
            type: "movie", 
            page: searchRequest.currentPage
        };
        const response: any = await this.axios.get("/",
        {
            params: filter
        });
        return response.data;
    };
    
    fetchById = async (id: string) => {
        const filter = {apikey: this.apiKey, i: id };
        const response: any = await this.axios.get("/",
            {
                params: filter
            }
        );
        return response.data;
    }
}