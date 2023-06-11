import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


export default function Business() {

  
  const [companyName, setCompanyName] = useState("");
  const [desc, setDesc] = useState("");
  const [values,setValues ]=useState("")
  const [open, setOpen] = useState(false)

  useEffect(function(){
    axios.get("/api/company/6485446a5929fda43dfcfe19").then(function(result){
      setCompanyName(result.data.name)
      setDesc(result.data.description)
      setValues(result.data.values)
    })
  },[])
  function submit(event){
    event.preventDefault();
    let data={
      name:companyName,
      description: desc,
      values:values
    }
    console.log(data)
    axios.post("/api/company/6485446a5929fda43dfcfe19",data).then(function(result){
      setOpen(true)
    })
  }
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
 
    Your Business Details are successfully saved! 
  </MuiAlert>
</Snackbar>

            <Typography variant="h3" gutterBottom>
            Business
            </Typography>
            <div style={{display:"flex",flexDirection:"column", gap:"20px"}}>
          
          <TextField label="Company Name" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
          <TextField label="Company's Business Description" multiline value={desc} onChange={(e)=>setDesc(e.target.value)}/>
          <TextField label="Company Values" multiline value={values} onChange={(e)=>setValues(e.target.value)}/>
          <Button variant='contained' type="submit" onClick={submit}>Save Changes</Button>
    </div>
      </div>
      
  )
}
