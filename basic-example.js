import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

async function run() {
  const response = await client.get('/api/success');
  console.log(response.data);
}

run();