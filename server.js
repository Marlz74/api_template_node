const express = require('express'),
app = express();

app.listen(3000,()=>{
    console.log('Node is running ');
})

app.get('/',(req,res)=>{
    res.send('hello node api')
})