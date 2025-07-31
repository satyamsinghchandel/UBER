const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
// Import and initialize socket
const { initializeSocket } = require('./socket');

const server = http.createServer(app);

initializeSocket(server);


server.listen(port, ()=>{
    console.log(`server is listening on port : ${port}`); 
})