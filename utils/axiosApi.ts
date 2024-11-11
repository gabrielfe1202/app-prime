import AsyncStorage from '@react-native-async-storage/async-storage';
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

const getTokenFromAsyncStorage = async (): Promise<string | null> => {    
    try {
        const token = await AsyncStorage.getItem('@Primeapp:usertoken');
        return token;
    } catch (error) {
        console.error('Erro ao obter o token do AsyncStorage', error);
        return null;
    }
};

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {  
        const token = await getTokenFromAsyncStorage();
                
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
