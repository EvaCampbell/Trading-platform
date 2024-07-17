import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Counter from "./Counter";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountInfoCard from "./AccountInfoCard";
import Country from "./Country";

const toggleButtonStyle = {
  padding: "10px 15px",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "14px",
  whiteSpace: "nowrap",
  height: "40px",
};

const OrderEntry = () => {
  const [value, setValue] = useState(0);
  const [view, setView] = useState("Lots");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ p: 2, borderRadius: 2, color: "#fff",width:'auto' }}>

      <Box
        sx={{
          display: "flex",
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
     
        <Grid item xs={12} md={6} lg={6} xl={6}>
       
         
          <Country/>
        
      

       
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs where each tab needs to be selected manually"
          >
            <Tab label={<span style={{ color: "white" }}>Limit</span>} />
            <Tab label={<span style={{ color: "white" }}>Market</span>} />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Typography
            sx={{ color: "#E74694", cursor: "pointer", fontSize: "16px",  marginTop:'2rem' ,paddingTop:'2rem'}}
          >
            Calculator
          </Typography>
        </Grid>
      </Box>
      <Box sx={{marginTop:"20px", marginBottom:"20px"}}>
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={(event, newValue) => setView(newValue)}
        >
          <ToggleButton
            sx={{
              ...(view === "Lots"
                ? {
                    backgroundColor: "white !important",
                    color: "#252223 !important",
                  }
                : {
                    backgroundColor: "#4F494C !important",
                    color: "White !important",
                  }),
              ...toggleButtonStyle,
            }}
            value="Lots"
          >
            Open By Lots
          </ToggleButton>
          <ToggleButton
            sx={{
              ...(view === "SL"
                ? {
                    backgroundColor: "white !important",
                    color: "#252223 !important",
                  }
                : {
                    backgroundColor: "#4F494C !important",
                    color: "white !important",
                  }),
              ...toggleButtonStyle,
            }}
            value="SL"
          >
            Open by SL
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
            Limit Price
          </Typography>
          <Counter />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
            Quantity
          </Typography>
          <Counter />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
        <FormControlLabel
          control={<Checkbox iconStyle={{ fill: "white" }} />}
          label="Add Set TP (Optional)"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Checkbox iconStyle={{ fill: "white" }} />}
          label="Add TP (Optional)"
          sx={{ color: "#fff" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          background: "#252223",
          borderRadius: "8px",
          height: "50px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#0E9F6E" }}>
          1.06915
        </Typography>
        <div style={{ border: "1px solid #2F2C2D", height: "30px" }}></div>
        <Typography variant="h6" sx={{ color: "#F05252" }}>
          1.06939
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          sx={{ flex: 1, mr: 0.5, backgroundColor: "#31C48D", height: "50px" }}
        >
          Buy / Long
        </Button>
        <Button
          variant="contained"
          sx={{ flex: 1, ml: 0.5, backgroundColor: "#F05252", height: "50px" }}
        >
          Sell / Short
        </Button>
      </Box>
      <AccountInfoCard/>
    </Box>
  );
};

export default OrderEntry;