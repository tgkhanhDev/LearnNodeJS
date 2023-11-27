const express = require('express');
let app = express();
let router1 = express.Router()
let router2 = express.Router()

//Này như một tấm bản đồ chưa đc sử dụng
router1.get('/', (req, res) => {
    res.json('router 1 user')
})

//Sử dụng bản đồ
//? => //localhost:3000/api1/
app.use('/api1/', router1)

app.get('/', (req, res)=> {
    res.json('Home')
})

app.listen(3000, ()=> {
    console.log('Server started on port')
})