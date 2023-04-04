const express = require('express');
const app = express();
const port = 4000;

app.listen(port);

app.use(express.json());
app.use((req, res, next) => {
   console.log(req.method + ":" + req.url + "\n");
   next();
});

app.get('/', (req,res) => {
    res.send("Hello World");
})

app.use((req,res,next) => {
    console.log(req.url, req.params);
})