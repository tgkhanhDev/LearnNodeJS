const http = require("http"); //import file trong nodejs

const route= require('./routes');

const userSever=http.createServer(route.handler)
userSever.listen(3005);