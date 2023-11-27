const http = require("http"); //import file trong nodejs

const express = require('express');
const routes = require("./routes");

//create Express App
const app = express();

// app.use('/', (req, res, next)=> {
//     console.log('This always run!');
//     next()
// })

// app.use((req, res, next) => {
//     console.log("In the middleware!");
//     next(); //ko có dòng này sẽ kh chạy tiếp vì chưa response
// })


app.use((req, res, next)=> {
    console.log("In another middleware!");
    res.send('<h1> Hello ExpressJS </h1>') 
    //send res, allơ us tui attach body with type: any
    //default type: text/html CANNOT OVERRIDE;
})




const server = http.createServer(routes.handler);

server.listen(3005);

