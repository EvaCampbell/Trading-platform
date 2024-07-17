// src/OpenPositionsTable.js

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Tabs,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const OpenPositionsTable = () => {
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(true);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .get("http://13.41.72.245/open_positions")
      .then((response) => {
        setPositions(response.data.open_trades);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const [date, time] = dateTimeStr.split(" ");
    const formattedDate = date.replace(/-/g, "/");
    return `${formattedDate} ${time}`;
  };

  console.log(positions);

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#100E0F", width: "100%" }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab label="Open Position" value="1" />
                <Tab label="Open Orders" value="2" />
                <Tab label="Order History" value="3" />
              </Tabs>
            </Box>

            <Box>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button className="btn_tabel">Sync Open Trades</Button>
                <Button className="btn_tabel">Close Profits</Button>
                <Button className="btn_tabel2">Close Losses</Button>
                <Button className="btn_tabel2">Close All</Button>
                <div style={{ border: "1px solid #2F2C2D", height: "30px" }}></div>
                <Button
                  sx={{
                    color: "#898587",
                    border:"none",
                    padding: "5px",
                  }}
                  onClick={() => setOpen((open) => !open)}
                >
                {open ?  <RemoveOutlinedIcon /> :<AddOutlinedIcon/>}
                 
                </Button>
              </Box>
            </Box>
          </Box>
          {open && (
            <>
              <TabPanel value="1">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="trader_title">OPEN (GMT)</TableCell>
                      <TableCell className="trader_title">SYMBOL</TableCell>
                      <TableCell className="trader_title">POSITION</TableCell>
                      <TableCell className="trader_title">ENTRY</TableCell>
                      <TableCell className="trader_title">SIZE</TableCell>
                      <TableCell className="trader_title">TP</TableCell>
                      <TableCell className="trader_title">SL</TableCell>
                      <TableCell className="trader_title">FEES</TableCell>
                      <TableCell className="trader_title">ROI</TableCell>
                      <TableCell className="trader_title">P/L</TableCell>
                      <TableCell className="trader_title"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {positions?.map((position, index) => (
                      <TableRow key={index}>
                        <TableCell className="open_trade">
                          <Box sx={{ flexDirection: "column" }}>
                            {position?.open}
                            {formatDateTime(position?.open_time)}
                          </Box>
                        </TableCell>
                        <TableCell className="open_trade">
                          {position?.symbol}
                        </TableCell>
                        <TableCell className="open_position">
                          {position?.position_type}
                        </TableCell>
                        <TableCell className="open_trade">
                          {position?.entry}
                        </TableCell>
                        <TableCell className="open_trade">
                          {position?.quantity}
                        </TableCell>
                        <TableCell className="open_trade">
                          {position?.tp}
                        </TableCell>
                        <TableCell className="open_trade">
                          {position?.sl}
                        </TableCell>
                        <TableCell className="open_trade">
                          ${position?.fees}
                        </TableCell>
                        <TableCell
                          className={
                            position?.roi < 0
                              ? "open_trade_sell"
                              : "open_position"
                          }
                        >
                          {position?.roi}%
                        </TableCell>
                        <TableCell
                          className={
                            position?.pl < 0
                              ? "open_trade_sell"
                              : "open_position"
                          }
                        >
                          ${position?.pl}
                        </TableCell>
                        <TableCell>
                          <Box display={"flex"}>
                            <Box
                              padding={"5px"}
                              border={"1px solid"}
                              borderRadius={"6px"}
                              borderColor={"#2c2c2e"}
                              sx={{
                                display: "flex",
                                justifyContent: "center,",
                                alignItems: "center",
                                marginLeft: "10px",
                              }}
                            >
                              <EditOutlinedIcon sx={{ color: "#fff" }} />
                            </Box>
                            <Box
                              padding={"5px"}
                              border={"1px solid"}
                              borderRadius={"6px"}
                              borderColor={"#2c2c2e"}
                              sx={{
                                display: "flex",
                                justifyContent: "center,",
                                alignItems: "center",
                                marginLeft: "10px",
                              }}
                            >
                              <CameraAltOutlinedIcon sx={{ color: "#fff" }} />
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </>
          )}
        </TabContext>
      </Box>
    </TableContainer>
  );
};

export default OpenPositionsTable;
