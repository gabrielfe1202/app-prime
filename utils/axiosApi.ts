import axios, { AxiosInstance } from 'axios';

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




// api.post('/exemplo', { chave: 'valor' })
//   .then(response => {
//     console.log('Resposta POST:', response.data);
//   })
//   .catch(error => {
//     console.error('Erro POST:', error);
//   });

export default api;
