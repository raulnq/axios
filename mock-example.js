import axios from 'axios';
import AxiosMockAdapter from "axios-mock-adapter";

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

const mock = new AxiosMockAdapter(client);

mock.onGet("/api/success").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

async function run() {
    const response = await client.get('/api/success');
    console.log(response.data);
}

run();