import { AxiosInstance } from 'axios';
import { MovieSearchRequest } from '../../domain/entities/movies.entity';
import axiosClient from '@/shared/services/api/axiosClient';
import settings from '../../../../appSettings.json';

class MoviesService {

    private axios: AxiosInstance;
    private apiKey: string;

    constructor(axios: AxiosInstance, apiKey: string){
        this.axios = axios;
        this.apiKey = apiKey;
    }

    fetch = async (searchRequest: MovieSearchRequest) => {
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

const instance = new MoviesService(axiosClient.instance, settings.omdbApi.apiKey);

export default { instance }