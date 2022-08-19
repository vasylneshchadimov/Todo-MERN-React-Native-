import axios from "axios";

import { asyncStoregeService } from "../asyncStorege/asyncStorege";

class HttpService {
    baseUrl: string;
    fetchingService: any;
    apiVersion: string;
    constructor(
        baseUrl: string,
        fetchingService: any = axios,
        apiVersion: string
    ) {
        this.baseUrl = baseUrl;
        this.fetchingService = fetchingService;
        this.apiVersion = apiVersion;
    }

    private getFullApiUrl(id: string) {
        return `${this.baseUrl}/${this.apiVersion}/${id}`;
    }
    private async addTokenToHeader() {
        const headers = {
            Authorization: await asyncStoregeService.getToken(),
        };

        return { headers };
    }

    async get(params: string) {
        return this.fetchingService.get(
            this.getFullApiUrl(params),
            await this.addTokenToHeader()
        );
    }

    async put<T>(id: string, data: T) {
        return this.fetchingService.put(
            this.getFullApiUrl(id),
            data,
            await this.addTokenToHeader()
        );
    }

    async post<T>(data: T, id: string = "") {
        return this.fetchingService.post(
            this.getFullApiUrl(id),
            data,
            await this.addTokenToHeader()
        );
    }

    async delete(id: string) {
        return this.fetchingService.delete(
            this.getFullApiUrl(id),
            await this.addTokenToHeader()
        );
    }
}

export default HttpService;
