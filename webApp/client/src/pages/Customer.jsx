import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Full name",
    flex: 2,
  },
  { field: "gender", headerName: "Gender", flex: 1 },

  { field: "age", headerName: "Age", flex: 1 },
  { field: "phoneNo", headerName: "Phone Number", flex: 1 },
  { field: "profession", headerName: "Profession", flex: 1 },
];


export default function Customer() {
  const [customers,setCustomers]=useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomerNumber, setNewCustomerNumber] = useState("+91");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [profession, setProfession] = useState("Male");
  function submit(event){
    event.preventDefault();
    let data={
      name:newCustomerName,
      phoneNo:newCustomerNumber,
      age:age,
      gender:gender,
      profession:profession
    }
    console.log(data)
    axios.post("/api/customer",data).then(function(result){
      setOpen(false)
    })
  }
  useEffect(function(){
    axios.get("/api/customer").then(function(result){
      setCustomers(result.data)
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
              Add a customer
            </Typography>
            <Typography
              sx={{ mt: 2 }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
            <TextField label="Customer Name" style={{ width: "100%" }} onChange={(e) => setNewCustomerName(e.target.value)} />
              <TextField label="Profession" style={{ width: "100%" }} onChange={(e) => setProfession(e.target.value)} />
              <TextField label="Age" type="number" onChange={(e) => setAge(e.target.value)} />
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <MuiTelInput
                value={newCustomerNumber}
                onChange={setNewCustomerNumber}
              />
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
      <Box component="main" style={{ width: "1000px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Leads
          </Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            style={{ height: "30px" }}
            onClick={handleOpen}
          >
            Add Customer
          </Button>
        </div>

        <DataGrid
          rows={customers}
          columns={columns}
          sx={{ width: "100%" }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </>
  );
}
