import axios from 'axios';
import tokenProvider from 'axios-token-interceptor';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

const cache = tokenProvider.tokenCache(  
  ()  => Promise.resolve("ABC"),  
  { maxAge: 3600000 } 
);  

client.interceptors.request.use(
  tokenProvider({
    getToken: cache
  })
);

async function run() {
  const response = await client.get('/api/protected');
  console.log(response.data);
}

run();