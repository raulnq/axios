import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

client.interceptors.request.use((config)=>{
  console.info('logging interceptor');
  return config;
}, (error) => Promise.reject(error));

client.interceptors.request.use((config)=>{
  console.info('Request interceptor 2');
  return config;
}, (error) => Promise.reject(error));

client.interceptors.request.use((config)=>{
  console.info('Request interceptor 3');
  return config;
}, (error) => Promise.reject(error));

client.interceptors.response.use((response)=>{
  console.info('Response interceptor 1');
  return response;
}, (error) => Promise.reject(error));

client.interceptors.response.use((response)=>{
  console.info('Response interceptor 2');
  return response;
}, (error) => Promise.reject(error));

client.interceptors.response.use((response)=>{
  console.info('Response interceptor 3');
  return response;
}, (error) => Promise.reject(error));


async function run() {
  const response = await client.get('/api/success');
  console.log(response.data);
}

run();