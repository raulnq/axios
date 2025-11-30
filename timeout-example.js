import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

async function run() {

    try {
        await client.get('/api/delay?seconds=6');
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out'); 
        }
    }
}

run();