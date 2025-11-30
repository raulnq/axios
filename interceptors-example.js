import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

client.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    config.metadata = { startTime: Date.now() };
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log('Response:', response.status, `(${duration}ms)`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.status);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

async function run() {
  const response = await client.get('/api/success');
  console.log(response.data);
}

run();