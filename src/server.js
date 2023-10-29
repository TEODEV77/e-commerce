const http = require("http");

const init = require("./class/socketConfig");

const app = require('./index');

const PORT = 3000;

const server = http.createServer(app);

init(server);

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
