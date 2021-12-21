const express = require('express');
const routers = require("../models/routers.js");
const app = express();

app.use(routers)

app.listen(8080, ()=>{
    console.log('Sistema online ... http://localhost:8080')
})