import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

client.interceptors.request.use(function (config) {
    console.log('Request interceptor registered before');
    return config;
  }, function (error) {
    console.log('Request error interceptor registered before');
    return Promise.reject(error);
  });

client.interceptors.response.use(function (response) {
    console.log('Response interceptor registered before');
    return response;
  }, function (error) {
    console.log('Response error interceptor registered before');
    return Promise.reject(error);
  });


axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry attempt #${retryCount}`);
    console.log(`Error: ${error.message}`);
  }
});

client.interceptors.request.use(function (config) {
    console.log('Request interceptor registered after');
    return config;
  }, function (error) {
    console.log('Request error interceptor registered after');
    return Promise.reject(error);
  });

client.interceptors.response.use(function (response) {
    console.log('Response interceptor registered after');
    return response;
  }, function (error) {
    console.log('Response error interceptor registered after');
    return Promise.reject(error);
  });


async function run() {
  try {
      const response = await client.get('/api/random-fail?percentage=90');
      console.log(response.data);
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}

run();