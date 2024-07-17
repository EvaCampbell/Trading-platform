import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import OrderEntry from "./OrderEntry";
import { Box, useTheme, createTheme, Button, Grid } from "@mui/material";
import axios from "axios";
import OpenPositionsTable from "./OpenPositionsTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#121212",
    },
    primary: {
      main: "#B93876",
    },
  },
});

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          color: "white",
          backgroundColor: "#333",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <p>{`${label} : $${payload[0].value}`}</p>
      </Box>
    );
  }
  return null;
}
export default function AreaCharts() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.41.72.245/fetch_metrics")
      .then((response) => {
        console.log("data", response.data);
        const transformedData = response.data.daily_summary.map((item) => ({
          date: item.date,
          total_pl: item.total_pl,
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
 
  return (  
<Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Box sx={{ margin: '0px 1rem', borderRadius: '8px' }}>
          <Box
            sx={{
              backgroundColor: '#121212',
              padding: '20px',
            }}
          >
            <Box sx={{ margin: '1.5rem 0rem' }}>
              <Button
                sx={{
                  backgroundColor: '#4F494C',
                  color: 'white',
                  borderRadius: '8px 0px  0px 8px',
                }}
              >
                Balance
              </Button>
              <Button
                sx={{
                  backgroundColor: '#252223',
                  color: 'white',
                  borderRadius: '0px 8px  8px 0px',
                }}
              >
                Daily PL
              </Button>
            </Box>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F965A0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F965A0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" tick={{ fill: '#898587' }} stroke="none" />
                <YAxis tick={{ fill: '#898587' }} stroke="none" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total_pl"
                  stroke="#B93876"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ marginTop: '2rem' }}>
            <OpenPositionsTable />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <OrderEntry />
      </Grid>
    </Grid>
  );
}
