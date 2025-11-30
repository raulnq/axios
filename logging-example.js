import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

client.interceptors.request.use(
  (request) => AxiosLogger.requestLogger(request, {
    prefixText: 'API',
  }),
  (error) => AxiosLogger.errorLogger(error, {
    prefixText: 'API',
    logger: console.error
  })
);  

client.interceptors.response.use(
  (response) => AxiosLogger.responseLogger(response, {
    prefixText: 'API',
  }),
  (error) => AxiosLogger.errorLogger(error, {
    prefixText: 'API',
    logger: console.error
  })
);

async function run() {
  await client.get('/api/success');
  try {
      await client.get('/api/fail');
  } catch (error) {
  }
}

run();