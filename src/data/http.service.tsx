import axios, {
    AxiosRequestConfig, AxiosInstance, AxiosResponse
} from "axios";

export const httpClient: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 300000,
    headers: {}
});

export async function postRequest<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await httpClient.post<T, AxiosResponse<T>>(url, data, config);
    if (!response || response.status !== 200)
        throw new Error("HttpClient:ERROR - " + response.status + ":" + response.statusText);
    return response.data;
}

export async function putRequest<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await httpClient.put<T, AxiosResponse<T>>(url, data, config);
    if (!response || response.status !== 200)
        throw new Error("HttpClient:ERROR - " + response.status + ":" + response.statusText);
    return response.data;
}

export async function deleteRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await httpClient.delete(url, config);
    if (!response || response.status !== 200)
        throw new Error("HttpClient:ERROR - " + response.status + ":" + response.statusText);
    return response.data;
}

export async function getRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    let response = await httpClient.get(url, config);
    if (!response || response.status !== 200)
        throw new Error("HttpClient:ERROR - " + response.status + ":" + response.statusText);
    return response.data;
}

export class HttpClientError extends Error { }