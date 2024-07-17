import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountIcon from "../Assets/icon1.png";
import Balance from "../Assets/ballance.png";
import NetPL from "../Assets/netPL.png";
import Equity from "../Assets/Equity.png";
import Average from "../Assets/Average.png";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CachedIcon from "@mui/icons-material/Cached";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import axios from "axios";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#F05252",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#31C48D",
  },
}));

const Header = () => {
  const [period, setPeriod] = useState("This Month");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://13.41.72.245/fetch_metrics')
      .then(response => {
        console.log("data",response.data);
        setData(response?.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log("data",data);

  return (
    <Box sx={{ padding: "30px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={2}
          xl={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <img
              src={AccountIcon}
              alt="Account Icon"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <div>
              <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                SecondaryAccount
              </Typography>
              <Typography variant="caption" sx={{ color: "#909090" }}>
                Account ID: {data?.account_id}
              </Typography>
            </div>
          </Box>
          <div style={{ border: "1px solid #2F2C2D", height: "30px" }}></div>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          xl={5}
          sx={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <div>
            <Typography variant="subtitle2" className="subheader">
              Trading Days
            </Typography>
            <Typography variant="h6" className="values">
            {data?.trading_days}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" className="subheader">
              Daily DD
            </Typography>
            <Typography variant="h6" className= {data?.daily_dd < 0 ? "values-negative" : "values"}>
            {data?.daily_dd}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" className="subheader">
              Max Daily DD
            </Typography>
            <Typography variant="h6" className={data?.max_daily_dd < 0 ? "values-negative" : "values"}>
              {data?.max_daily_dd}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" className="subheader">
              Max DD
            </Typography>
            <Typography variant="h6" className={data?.max_dd < 0 ? "values-negative" : "values"}>
            {data?.max_dd}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" className="subheader">
              Profit Target
            </Typography>
            <Typography variant="h6" className={data?.profit_target < 0 ? "values-negative" : "values"}>
            {data?.profit_target}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          xl={5}
          sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Box>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={10}
                sx={{
                  color: "#FFFFFF",
                  border: "1px solid #FFFFFF",
                  "& .MuiSelect-icon": {
                    color: "#FFFFFF",
                  },
                }}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={10}>This Month</MenuItem>
                <MenuItem value={20}>This Week</MenuItem>
                <MenuItem value={30}>This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button variant="contained" sx={{backgroundColor: "var(--primary-600, #B93876)"}}>
              <AddIcon /> Import trades
            </Button>
          </Box>
          <Box>
            <Button variant="contained" sx={{backgroundColor: "var(--primary-600, #B93876)"}}>
              <CachedIcon /> Update objectives
            </Button>
          </Box>
        </Grid>
        <Box sx={{ display: "flex", gap: "10px", width: "100%" ,marginTop:"20px"}}>
          <Box className="stats-box">
            <div>
              <img src={Balance} alt="Balance" />
            </div>
            <div>
              <Typography variant="subtitle2" className="subheader">
                Balance
              </Typography>
              <Typography variant="h6" className="amount">
                ${data?.balance} <span className="percentage">(9.85%)</span>
              </Typography>
            </div>
          </Box>
          <Box className="stats-box">
            <div>
              <img src={NetPL} alt="Net P&L" />
            </div>
            <div>
              <Typography variant="subtitle2" className="subheader">
                Net P&L
              </Typography>
              <Typography variant="h6" className="amount">
                $1,932.39 <span className="percentage">({data?.net_pl})</span>
              </Typography>
            </div>
          </Box>
          <Box className="stats-box">
            <div>
              <img src={Equity} alt="Equity" />{" "}
            </div>
            <div>
              <Typography variant="subtitle2" className="subheader">
                Equity
              </Typography>
              <Typography variant="h6" className="amount">
               ${data?.equity} <span className="percentage">(0.85%)</span>
              </Typography>
            </div>
          </Box>
          <Box className="stats-box">
            <div>
              <img src={Average} alt="Average" />{" "}
            </div>
            <div style={{ width: "100%" }}>
              <Typography variant="subtitle2" className="subheader">
                Avg Win / Loss
              </Typography>

              <Typography variant="h6" className="amount">
                $129 <span className="percentage">(29.85%)</span>
              </Typography>

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={70} />
              </Stack>
            </div>
          </Box>
          <Box
            className="stats-box"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <div>
              <Typography variant="subtitle2" className="subheader">
                Win Rate
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#31C48D",
                  fontSize: "18px",
                  fontWeight: 800,
                  lineHeight: "27px",
                }}
              >
                {data?.win_rate}%
              </Typography>
            </div>
            <div style={{ border: "1px solid #2F2C2D", height: "30px" }}></div>
            <div>
              <Typography variant="subtitle2" className="subheader">
                Profit Factor
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "27px",
                }}
              >
                {data?.profit_factor}%
              </Typography>
            </div>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Header;
