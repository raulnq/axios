import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import axiosRetry from 'axios-retry';
import tokenProvider from 'axios-token-interceptor';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});


client.interceptors.response.use(
  response => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(`Request duration: ${duration}ms`);
    return AxiosLogger.responseLogger(response);
  },
  error => {
    const retryState = error.config['axios-retry']; 
    const isLastAttempt = retryState?.retryCount === retryState?.retries;
    if (isLastAttempt) {
        if (error.config?.metadata?.startTime) {
          const duration = Date.now() - error.config.metadata.startTime;
          console.log(`Request duration (error): ${duration}ms`);
        }
      return AxiosLogger.errorLogger(error);
    }
    return Promise.reject(error);
  }
);

axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry attempt #${retryCount}`);
  }
});

client.interceptors.request.use(
  tokenProvider({
    getToken: () => { 
        return "ABC";
      }
  })
);

client.interceptors.request.use(
  config => {
    const retryState = config['axios-retry']; 
    if (!retryState) {
      config.metadata = { startTime: Date.now() };
      return AxiosLogger.requestLogger(config);
    }
    return config;
  }
);


async function run() {
  try {
      const response = await client.get('/api/random-fail?percentage=50');
      console.log(response.data);
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}

run();