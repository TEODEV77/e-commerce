import http from 'http';

import init from './class/socketConfig.js'

import app from './index.js';
import { initMongoDB } from './database/mongodb.js';

const PORT = process.env.PORT;

await initMongoDB();

const server = http.createServer(app);

init(server);

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
