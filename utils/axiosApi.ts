import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL = 'https://sistema.primetimecd.com.br/api/';

const username = 'primetime-cd';
const password = 'p#rime@tim5342me';

const toBase64 = (str: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let base64 = '';
    for (let i = 0; i < data.length; i += 3) {
        const chunk = data.slice(i, i + 3);
        base64 += String.fromCharCode(...chunk);
    }
    return btoa(base64);  // btoa é uma função de codificação Base64 nativa no navegador
};

const basicAuth = 'Basic ' + toBase64(`${username}:${password}`);

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
});

const token = 'b1903c95-78d2-400a-b21d-dd212a898276';

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (token) {
            const tokenParam = `token=${token}`;            
            const separator = config.url?.includes('?') ? '&' : '?';            
            config.url = `${config.url}${separator}${tokenParam}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
