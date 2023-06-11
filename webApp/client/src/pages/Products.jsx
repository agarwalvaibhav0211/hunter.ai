
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import axios from "axios"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Products() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProductName, setNewProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [products,setProducts ]=useState([])
  function submit(event){
    event.preventDefault();
    let data={
      name:newProductName,
      description:desc,
    }
    console.log(data)
    axios.post("/api/product",data).then(function(result){
      setOpen(false)
    })
  }
  useEffect(function(){
    axios.get("/api/product").then(function(result){
      setProducts(result.data)
    })
  },[open])
  return (
    <>
    
    <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        
        <Fade in={open}>
          <Box sx={style} component="form" onSubmit={submit}>
            <Typography variant="h6" component="h2">
              Add a Product
            </Typography>
            <Typography
              sx={{ mt: 2 }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
            <TextField label="Product Name" style={{ width: "100%" }} onChange={(e) => setNewProductName(e.target.value)} />
              <TextField label="Description" style={{ width: "100%" }} onChange={(e) => setDesc(e.target.value)} multiline/>
              
              <Button type="submit"
                startIcon={<AddIcon />}
                variant="contained"
                style={{ height: "30px" }}
              >
                Add
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>

      <Typography variant="h3" gutterBottom>
            Products
        </Typography>
        <Button variant='contained' startIcon={<AddIcon/>} style={{height:"30px"}} onClick={handleOpen}>Add Product</Button>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px"}}>
        {
          products.map(product => <Product {...product} />)
        }
        </div>
    </div>
    </>
  )
}

function Product({name, description}) {
    return <Card variant="outlined">
    
    <CardContent>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </CardContent>
  </Card>
}
