import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

const clientWithCache = setupCache(client, {
  ttl: 15 * 60 * 1000
});

async function run() {
    const response = await clientWithCache.get('/api/success');
    console.log(response.data);

    const response2 = await clientWithCache.get('/api/success');
    console.log(response2.data);
}

run();