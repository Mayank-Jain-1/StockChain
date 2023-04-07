const express = require('express');
const app = express();
const port = 4000;
const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



app.listen(port);
app.use(express.json());
app.use((req, res, next) => {
   console.log(req.method + ":" + req.url + "\n");
   next();
});

app.get('/', (req,res) => {
    res.send("Hello World");
})

app.post('/addStock', )