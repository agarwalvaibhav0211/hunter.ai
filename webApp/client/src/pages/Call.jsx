import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { Typography, Select,MenuItem } from "@mui/material";
import axios from "axios"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function CallComponent() {

  const [open, setOpen] = useState(false)
  const [companyName, setCompanyName] = useState("");
  const [products,setProducts ]=useState([])
  const [customers,setCustomers]=useState([])
  const [productName,setProductName]=useState("");
  const [phoneNo,setPhoneNo]=useState("");
  useEffect(function(){
    axios.get("/api/customer").then(function(result){
      setCustomers(result.data)
    })
    axios.get("/api/product").then(function(result){
      setProducts(result.data)
    })
  },[])
  function submit(event){
    event.preventDefault();
    let data={
      productName:productName,
      phoneNo: phoneNo
    }
    console.log(data)
    axios.post("/api/call",data).then(function(result){
      setOpen(true)
    })
  }
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
      Customer will receive the call shortly!
  </MuiAlert>
</Snackbar>
            <Typography variant="h3" gutterBottom>
            Make a Call
            </Typography>
            <div style={{display:"flex",flexDirection:"column", gap:"20px"}}>
          
            <Typography variant="paragraph" gutterBottom>
            Customer
            </Typography>
          <Select onChange={(e)=>setPhoneNo(e.target.value)} placeholder="Phone Number">
          {customers.map(function(customer, i){
              return <MenuItem value={customer.phoneNo}>{customer.name}</MenuItem>;
          })}
          </Select>
          <Typography variant="paragraph" gutterBottom>
            Product
            </Typography>
          <Select onChange={(e)=>setProductName(e.target.value)} value={productName} placeholder="Product Name">
          {products.map(function(product, i){
              return <MenuItem value={product.name}>{product.name}</MenuItem>;
          })}
          </Select>
          <Button variant='contained' type="submit" onClick={submit}>Call</Button>
    </div>
      </div>
      
  )
}
