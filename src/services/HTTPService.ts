export interface APIResponse<T = any> {
    data?: T;
    status: number;
    message?: string;
}

import axios, { AxiosResponse } from 'axios';

export abstract class http {

    /**
     * The API URL (set from .env and dotenv)
     */
    private static API_URL: string;

    /**
     * Initialize the HTTP Service class
     */
    public static initialize(): void {
        this.API_URL = process.env.API_URL;
    }

    /**
     * Make a simple GET request
     * @param url The request URL
     */
    public static get<T = any>(url: string): Promise<APIResponse<T>> {
        return new Promise(async (resolve, reject) => {
            try {
                let response: AxiosResponse<APIResponse<T>> = await axios.get(this.API_URL + url);
                if (response.data.message == 'error' || response.data.status == 500) {
                    return reject(response.data);
                }

                return resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Make a POST request with data
     * @param url The request URL
     * @param data Data to send (optional)
     */
    public static post<T = any>(url: string, data?: T): Promise<APIResponse<T>> {
        return new Promise(async (resolve, reject) => {
            try {
                data = !data ? null : data;
                let response: AxiosResponse<APIResponse<T>> = await axios.post(this.API_URL + url, data);
                if (response.data.message == 'error' || response.data.status == 500) {
                    return reject(response.data);
                }

                return resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Make a PUT request with data
     * @param url The request URL
     * @param data Data to send (optional)
     */
    public static put<T = any>(url: string, data?: T): Promise<APIResponse<T>> {
        return new Promise(async (resolve, reject) => {
            try {
                data = !data ? null : data;
                let response: AxiosResponse<APIResponse<T>> = await axios.put(this.API_URL + url, data);
                if (response.data.message == 'error' || response.data.status == 500) {
                    return reject(response.data);
                }

                return resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Make a DELETE request
     * @param url The request URL
     */
    public static delete<T = any>(url: string): Promise<APIResponse<T>> {
        return new Promise(async (resolve, reject) => {
            try {
                let response: AxiosResponse<APIResponse<T>> = await axios.delete(this.API_URL + url);
                if (response.data.message == 'error' || response.data.status == 500) {
                    return reject(response.data);
                }

                return resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

}
