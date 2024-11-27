const express = require('express'),
mongoose = require('mongoose'),
Product = require("./models/productModel"),
app = express();

// to use json
app.use(express.json());

// to use form data 
app.use(express.urlencoded({extended:false}));


mongoose.connect("mongodb+srv://root:1@cluster0.i231x.mongodb.net/test_node?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    
    app.listen(3000,()=>{
        console.log('Node is running ');
    })

    app.post('/product', async (req,res)=>{
        try {

            const product = await Product.create(req.body);

            res.status(201).json({status:true,message:"Product uploaded successfully",product:product});
            
            
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    })

    app.get('/products', async (req,res)=>{
        try {
            const products = await Product.find({});
            res.status(200).json({status:true,products:products});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    })

    app.get('/product/:id', async (req,res)=>{
        try {

            const {id}= req.params,
            product = await Product.findById(id);
            res.status(200).json({status:true,product:product});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    })

    app.put('/product/:id', async (req,res)=>{
        try {

            const {id}= req.params,
            product = await Product.findByIdAndUpdate(id,req.body);
            if(!product){
                return res.status(404).json({status:false,message:`Product not found ${id}` })    
            }
            const updatedProduct = await Product.findById(id);
            return res.status(200).json({status:true,message:"Product updated",product:updatedProduct});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    })


    app.delete('/product/:id', async (req,res)=>{
        try {

            const {id}= req.params,
            product = await Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({status:false,message:`Product not found ${id}` })    
            }
            
            return res.status(200).json({status:true,message:"Product deleted"});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    })

    


}).catch((err)=>{
    console.log(err)
})



app.get('/',(req,res)=>{
    res.send('hello node api')
})

app.get('/blog',(req,res)=>{
    res.send('hello blog')
})