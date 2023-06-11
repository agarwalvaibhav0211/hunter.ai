var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
const bcrypt = require('bcrypt');
const { route } = require('./users');
const { ObjectId } = require('mongodb');
const saltRounds = 10;
const axios=require("axios")

router.post('/login', async function(req, res, next) {
  let user=await db["mainDB"].collection("users").findOne({
    email:req.body.email
  })
  let match = await bcrypt.compare(req.body.password, user.password);
  if(match){
    req.session.user=user;
    res.send(200);
  }
  res.status(401).send({error:"No Such User"})
});

router.get("/getUser",async function(req,res,next){
  if(req.session.user){
    res.send(req.session.user)
  }else{
    res.status(401).send({error:"Not Logged In"});
  }
})

router.post("/signup",async function(req,res,next){
  let existingUser=await db["mainDB"].collection("users").findOne({
    email:req.body.email
  })
  if(existingUser!=null){
    res.status(400).send({error:"Email Already Exists"});
    return;
  }
  let user={
    email:req.body.email,
    password: await bcrypt.hash(req.body.password, saltRounds),
    name:req.body.name,
  };
  await db["mainDB"].collection("users").insertOne(user);
  req.session.user=user;
  res.send(200)
})

router.post("/customer",async function(req,res,next){
  let phone=req.body.phoneNo.split(" ");
  phone=phone.join("");
  phone=phone.replace("+","");
  let customer={
    name:req.body.name,
    phoneNo: phone,
    age:req.body.age,
    gender:req.body.gender,
    profession:req.body.profession
  };
  await db["mainDB"].collection("customers").insertOne(customer);
  res.send(200);
})

router.get("/customer",async function(req,res,next){
  let customers=await db["mainDB"].collection("customers").find({});
  customers=await customers.toArray();
  for(let i=0;i<customers.length;i++){
    customers[i].id=i+1
  }
  res.send(customers);
})

router.get("/customer/:id",async function(req,res,next){
  let customer=await db["mainDB"].collection("customers").findOne({_id:ObjectId(req.params.id)});
  if(customer==null){
    res.status(400).send({error:"No Such customer"});
    return
  }
  res.send(customer);
})

router.post("/company/:id",async function(req,res,next){
  let company={
    name:req.body.name,
    description: req.body.description,
    values:req.body.values
  };
  await db["mainDB"].collection("company").updateOne({_id:new ObjectId(req.params.id)},{$set:company});
  res.send(company);
})

router.get("/company/:id",async function(req,res,next){
  let companies=await db["mainDB"].collection("company").findOne({_id:new ObjectId(req.params.id)});
  res.send(companies);
})

router.post("/call",async function(req,res,next){
  let customer=await db["mainDB"].collection("customers").findOne({phoneNo:req.body.phoneNo});
  if(customer==null){
    res.status(400).send({error:"No Such customer"});
    return
  }
  
  let product=await db["mainDB"].collection("products").findOne({name:req.body.productName});
  if(product==null){
    res.status(400).send({error:"No Such product"});
    return
  }
  let company=await db["mainDB"].collection("company").findOne({});
  axios.post("https://mlserver.vaibhav.edrives.in/call/v2",{customer,product,company})
  res.send(200);
})



router.post("/product",async function(req,res,next){
  let product={
    name:req.body.name,
    description: req.body.description
  };
  await db["mainDB"].collection("products").insertOne(product);
  res.send(200);
})

router.get("/product",async function(req,res,next){
  let products=await db["mainDB"].collection("products").find({});
  products=await products.toArray();
  res.send(products);
})

router.get("/product/:id",async function(req,res,next){
  let product=await db["mainDB"].collection("products").findOne({_id:ObjectId(req.params.id)});
  if(product==null){
    res.status(400).send({error:"No Such product"});
  }
  res.send(product);
})


module.exports = router;
