import axios, {AxiosInstance, AxiosResponse} from 'axios';

const baseURL = 'https://private-be4b2-narukane.apiary-mock.com/';

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGet = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
